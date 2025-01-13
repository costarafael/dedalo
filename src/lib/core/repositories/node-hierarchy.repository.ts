import { 
  INodeHierarchyRepository, 
  NodeHierarchyRule, 
  NewNodeHierarchyRule
} from '../interfaces'
import { nodeHierarchyApi } from '@/lib/http/services/node-hierarchy.service'

export class NodeHierarchyRepository implements INodeHierarchyRepository {
  async findAll(): Promise<NodeHierarchyRule[]> {
    const { data } = await nodeHierarchyApi.getAll()
    return data
  }

  async findById(id: string): Promise<NodeHierarchyRule | null> {
    const { data } = await nodeHierarchyApi.getById(id)
    return data
  }

  async findByParentId(parentId: string): Promise<NodeHierarchyRule[]> {
    const { data } = await nodeHierarchyApi.getByParentId(parentId)
    return data
  }

  async findByChildId(childId: string): Promise<NodeHierarchyRule[]> {
    const { data } = await nodeHierarchyApi.getByChildId(childId)
    return data
  }

  async create(data: NewNodeHierarchyRule): Promise<NodeHierarchyRule> {
    const { data: rule } = await nodeHierarchyApi.create(data)
    return rule
  }

  async update(id: string, data: Partial<NodeHierarchyRule>): Promise<NodeHierarchyRule> {
    const { data: rule } = await nodeHierarchyApi.update(id, data)
    return rule
  }

  async delete(id: string): Promise<void> {
    await nodeHierarchyApi.delete(id)
  }

  async validateRule(parentId: string, childId: string): Promise<boolean> {
    const { data } = await nodeHierarchyApi.validateRule(parentId, childId)
    return data
  }
} 