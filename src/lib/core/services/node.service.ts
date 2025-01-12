import { INodeRepository, INodeService, NodeName, NewNodeName, HierarchyValidationType } from '../interfaces'

export class NodeService implements INodeService {
  constructor(private readonly nodeRepository: INodeRepository) {}

  async getAll(): Promise<NodeName[]> {
    return this.nodeRepository.findAll()
  }

  async getById(id: string): Promise<NodeName | null> {
    return this.nodeRepository.findById(id)
  }

  async getClientNodes(clientId: string): Promise<NodeName[]> {
    return this.nodeRepository.findByClientId(clientId)
  }

  async getActiveClientNodes(clientId: string): Promise<NodeName[]> {
    return this.nodeRepository.findActiveByClientId(clientId)
  }

  async create(node: NewNodeName): Promise<NodeName> {
    // Validações de negócio
    if (!node.name) {
      throw new Error('Nome do node é obrigatório')
    }
    if (!node.client_id) {
      throw new Error('Cliente é obrigatório')
    }

    return this.nodeRepository.create({
      ...node,
      validationType: node.validationType ?? HierarchyValidationType.FLEXIBLE
    })
  }

  async update(id: string, node: Partial<NodeName>): Promise<NodeName> {
    return this.nodeRepository.update(id, node)
  }

  async updateNodesOrder(nodes: Pick<NodeName, 'id' | 'client_id' | 'name' | 'order' | 'is_root'>[]): Promise<void> {
    return this.nodeRepository.updateOrder(nodes)
  }

  async delete(id: string): Promise<void> {
    return this.nodeRepository.delete(id)
  }
} 