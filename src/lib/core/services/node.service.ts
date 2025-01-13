import { INodeService } from '../interfaces/service.interfaces'
import { INodeRepository, INodeHierarchyRepository } from '../interfaces/repository.interfaces'
import type { NodeName } from '../interfaces/repository.interfaces'

export class NodeService implements INodeService {
  constructor(
    private nodeRepository: INodeRepository,
    private nodeHierarchyRepository: INodeHierarchyRepository
  ) {}

  validateNode(data: Partial<NodeName>): boolean {
    if (!data) return false
    
    // Validações básicas
    if (data.name && data.name.length < 3) return false
    if (!data.client_id) return false
    if (!data.type) return false
    
    return true
  }

  validateNodeData(data: any): boolean {
    if (!data) return false
    
    // Validar estrutura básica
    const requiredFields = ['name', 'client_id', 'type']
    return requiredFields.every(field => field in data)
  }

  transformNodeData(data: any): NodeName {
    if (!this.validateNodeData(data)) {
      throw new Error('Invalid node data structure')
    }

    return {
      id: data.id,
      name: data.name,
      client_id: data.client_id,
      type: data.type,
      metadata: data.metadata || {},
      created_at: data.created_at || new Date().toISOString(),
      updated_at: data.updated_at || new Date().toISOString(),
      deleted_at: data.deleted_at || null,
      is_active: data.is_active ?? true
    }
  }

  async validateNodeName(name: string, clientId: string, excludeId?: string): Promise<boolean> {
    // Verificar se já existe um nó com o mesmo nome para o cliente
    const nodes = await this.nodeRepository.findByClientId(clientId)
    return !nodes.some(node => 
      node.name === name && 
      node.id !== excludeId && 
      !node.deleted_at
    )
  }

  async validateHierarchy(parentId: string, childId: string): Promise<boolean> {
    // Verificar se os nós existem
    const [parent, child] = await Promise.all([
      this.nodeRepository.findById(parentId),
      this.nodeRepository.findById(childId)
    ])

    if (!parent || !child) return false
    
    // Verificar se são do mesmo cliente
    if (parent.client_id !== child.client_id) return false
    
    // Verificar se não é o mesmo nó
    if (parentId === childId) return false
    
    // TODO: Adicionar validações específicas de hierarquia
    // - Verificar ciclos
    // - Verificar regras de tipos de nós
    // - etc
    
    return true
  }
} 