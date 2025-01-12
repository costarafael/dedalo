import { NodeHierarchy, NewNodeHierarchy } from '@/types/node-hierarchy'
import { INodeHierarchyService } from '../interfaces/service.interfaces'
import { INodeHierarchyRepository } from '../interfaces/repository.interfaces'

export class NodeHierarchyService implements INodeHierarchyService {
  constructor(private readonly repository: INodeHierarchyRepository) {}

  async getAll(): Promise<NodeHierarchy[]> {
    return this.repository.findAll()
  }

  async getById(id: string): Promise<NodeHierarchy | null> {
    return this.repository.findById(id)
  }

  async getClientHierarchies(clientId: string): Promise<NodeHierarchy[]> {
    return this.repository.findByClientId(clientId)
  }

  async getActiveClientHierarchies(clientId: string): Promise<NodeHierarchy[]> {
    return this.repository.findActiveByClientId(clientId)
  }

  async getParentNodeHierarchies(parentNodeId: string): Promise<NodeHierarchy[]> {
    return this.repository.findByParentNodeId(parentNodeId)
  }

  async getChildNodeHierarchies(childNodeId: string): Promise<NodeHierarchy[]> {
    return this.repository.findByChildNodeId(childNodeId)
  }

  async create(data: NewNodeHierarchy): Promise<NodeHierarchy> {
    await this.validateHierarchyCreation(data)
    return this.repository.create(data)
  }

  async update(id: string, data: Partial<NodeHierarchy>): Promise<NodeHierarchy> {
    const existing = await this.repository.findById(id)
    if (!existing) {
      throw new Error('Hierarquia não encontrada')
    }

    if (data.parent_node_id && data.child_node_id) {
      await this.validateHierarchyNodes(data.parent_node_id, data.child_node_id)
    }

    return this.repository.update(id, data)
  }

  async delete(id: string): Promise<void> {
    const existing = await this.repository.findById(id)
    if (!existing) {
      throw new Error('Hierarquia não encontrada')
    }

    return this.repository.delete(id)
  }

  async validateHierarchyCreation(hierarchy: NewNodeHierarchy): Promise<void> {
    if (!hierarchy.parent_node_id || !hierarchy.child_node_id) {
      throw new Error('Nós pai e filho são obrigatórios')
    }

    await this.validateHierarchyNodes(hierarchy.parent_node_id, hierarchy.child_node_id)
  }

  async validateHierarchyNodes(parentNodeId: string, childNodeId: string): Promise<void> {
    // Verifica se já existe uma hierarquia com os mesmos nós
    const existing = await this.repository.findByNodeIds(parentNodeId, childNodeId)
    if (existing) {
      throw new Error('Já existe uma hierarquia com estes nós')
    }

    // Verifica se o nó pai não é o mesmo que o nó filho
    if (parentNodeId === childNodeId) {
      throw new Error('Um nó não pode ser pai dele mesmo')
    }

    // Verifica se não criaria um ciclo na hierarquia
    const childHierarchies = await this.repository.findByParentNodeId(childNodeId)
    const hasCircularDependency = childHierarchies.some(h => h.child_node_id === parentNodeId)
    if (hasCircularDependency) {
      throw new Error('A hierarquia criaria uma dependência circular')
    }
  }
} 