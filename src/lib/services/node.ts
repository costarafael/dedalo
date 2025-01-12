import { NodeService } from '@/lib/core/services/node.service'
import { NodeRepository } from '@/lib/core/repositories/node.repository'

let nodeService: NodeService | null = null

export function getNodeService(): NodeService {
  if (!nodeService) {
    const repository = new NodeRepository()
    nodeService = new NodeService(repository)
  }
  return nodeService
} 