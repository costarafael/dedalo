import { 
  INodeRepository, 
  NodeName, 
  NewNodeName
} from '../interfaces'
import { nodeApi } from '@/lib/http/services/node.service'

export class NodeRepository implements INodeRepository {
  async findAll(): Promise<NodeName[]> {
    const { data } = await nodeApi.getAll()
    return data
  }

  async findByClientId(clientId: string): Promise<NodeName[]> {
    const { data } = await nodeApi.getByClient(clientId)
    return data
  }

  async findRootNode(clientId: string): Promise<NodeName | null> {
    const { data } = await nodeApi.getRootNode(clientId)
    return data
  }

  async findById(id: string): Promise<NodeName | null> {
    const { data } = await nodeApi.getById(id)
    return data
  }

  async create(data: NewNodeName): Promise<NodeName> {
    const { data: node } = await nodeApi.create(data)
    return node
  }

  async update(id: string, data: Partial<NodeName>): Promise<NodeName> {
    const { data: node } = await nodeApi.update(id, data)
    return node
  }

  async delete(id: string): Promise<void> {
    await nodeApi.delete(id)
  }
} 