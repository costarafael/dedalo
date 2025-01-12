import { NodeHierarchyRepository } from '@/lib/core/repositories'
import { NodeHierarchyService } from '@/lib/core/services'

// Singleton do NodeHierarchyService
let nodeHierarchyService: NodeHierarchyService | null = null

export const getNodeHierarchyService = () => {
  if (!nodeHierarchyService) {
    const repository = new NodeHierarchyRepository()
    nodeHierarchyService = new NodeHierarchyService(repository)
  }
  return nodeHierarchyService
} 