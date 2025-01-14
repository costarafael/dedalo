import { NodeHierarchyRule } from "../interfaces/repository.interfaces"
import { NodeHierarchyRepository } from "../repositories/node-hierarchy.repository"

export class NodeHierarchyService {
  private repository: NodeHierarchyRepository

  constructor(repository?: NodeHierarchyRepository) {
    this.repository = repository || new NodeHierarchyRepository()
  }

  async findAll(): Promise<NodeHierarchyRule[]> {
    return this.repository.findAll()
  }

  async findById(id: string): Promise<NodeHierarchyRule | null> {
    return this.repository.findById(id)
  }

  async findByParentId(parentId: string): Promise<NodeHierarchyRule[]> {
    return this.repository.findByParentId(parentId)
  }

  async findByChildId(childId: string): Promise<NodeHierarchyRule[]> {
    return this.repository.findByChildId(childId)
  }

  async create(data: { parent_node_id: string, child_node_id: string }): Promise<NodeHierarchyRule> {
    return this.repository.create(data)
  }

  async update(id: string, data: Partial<NodeHierarchyRule>): Promise<NodeHierarchyRule> {
    return this.repository.update(id, data)
  }

  async delete(id: string): Promise<void> {
    return this.repository.delete(id)
  }
} 