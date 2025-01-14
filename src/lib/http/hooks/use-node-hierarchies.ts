import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { NodeHierarchyRule } from "@/lib/core/interfaces/repository.interfaces"
import { NodeHierarchyService } from "@/lib/core/services/node-hierarchy.service"

const hierarchyService = new NodeHierarchyService()

export function useNodeHierarchies() {
  const queryClient = useQueryClient()

  const {
    data: hierarchies = [],
    isLoading
  } = useQuery<NodeHierarchyRule[]>({
    queryKey: ["node-hierarchies"],
    queryFn: () => hierarchyService.findAll(),
  })

  const { mutateAsync: createHierarchy } = useMutation({
    mutationFn: (data: { parent_node_id: string, child_node_id: string }) =>
      hierarchyService.create(data),
    onSuccess: () => {
      toast.success("Hierarquia criada com sucesso")
      queryClient.invalidateQueries({ queryKey: ["node-hierarchies"] })
    },
    onError: (error) => {
      console.error("Erro ao criar hierarquia:", error)
      toast.error("Erro ao criar hierarquia")
    },
  })

  return {
    hierarchies,
    isLoading,
    createHierarchy
  }
}

export function useNodeHierarchiesByParent(parentId: string) {
  const {
    data: hierarchies = [],
    isLoading
  } = useQuery<NodeHierarchyRule[]>({
    queryKey: ["node-hierarchies", "parent", parentId],
    queryFn: () => hierarchyService.findByParentId(parentId),
    enabled: !!parentId,
  })

  return {
    hierarchies,
    isLoading,
  }
}

export function useNodeHierarchiesByChild(childId: string) {
  const {
    data: hierarchies = [],
    isLoading
  } = useQuery<NodeHierarchyRule[]>({
    queryKey: ["node-hierarchies", "child", childId],
    queryFn: () => hierarchyService.findByChildId(childId),
    enabled: !!childId,
  })

  return {
    hierarchies,
    isLoading,
  }
} 