import { NodeName } from "../interfaces/repository.interfaces"
import { NodeRepository } from "../repositories/node.repository"

export class NodeService {
  private repository: NodeRepository

  constructor(repository?: NodeRepository) {
    this.repository = repository || new NodeRepository()
  }

  async getNodes(clientId: string): Promise<NodeName[]> {
    return this.repository.findByClientId(clientId)
  }

  async createNode(data: { client_id: string; name: string; unit_selection_mode: "single" | "multiple" }): Promise<NodeName> {
    return this.repository.create(data)
  }

  async updateNode(id: string, data: Partial<NodeName>): Promise<NodeName> {
    return this.repository.update(id, data)
  }

  async deleteNode(id: string): Promise<void> {
    return this.repository.delete(id)
  }

  async updateOrder(nodes: NodeName[]): Promise<void> {
    await Promise.all(
      nodes.map((node, index) =>
        this.repository.update(node.id, { order: index })
      )
    )
  }
} 