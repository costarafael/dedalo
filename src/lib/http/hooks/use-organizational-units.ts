import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { NodeName, OrganizationalUnitRow } from "@/lib/core/interfaces/repository.interfaces"
import { NodeService } from "@/lib/core/services/node.service"
import { UnitService } from "@/lib/core/services/unit.service"

const nodeService = new NodeService()
const unitService = new UnitService()

export function useOrganizationalUnits(clientId: string) {
  const queryClient = useQueryClient()

  const {
    data: nodes = [],
    isLoading: isLoadingNodes
  } = useQuery<NodeName[]>({
    queryKey: ["nodes", clientId],
    queryFn: () => nodeService.getNodes(clientId),
  })

  const {
    data: units = [],
    isLoading: isLoadingUnits
  } = useQuery<OrganizationalUnitRow[]>({
    queryKey: ["units", clientId],
    queryFn: () => unitService.getUnits(clientId),
  })

  const {
    data: rootUnit,
    isLoading: isLoadingRootUnit
  } = useQuery<OrganizationalUnitRow | null>({
    queryKey: ["root-unit", clientId],
    queryFn: () => unitService.getRootUnit(clientId),
  })

  const { mutateAsync: createNode } = useMutation({
    mutationFn: (data: { name: string, unit_selection_mode: "single" | "multiple" }) =>
      nodeService.createNode({
        client_id: clientId,
        name: data.name,
        unit_selection_mode: data.unit_selection_mode,
      }),
    onSuccess: () => {
      toast.success("Node criado com sucesso")
      queryClient.invalidateQueries({ queryKey: ["nodes", clientId] })
    },
    onError: (error) => {
      console.error("Erro ao criar node:", error)
      toast.error("Erro ao criar node")
    },
  })

  const { mutateAsync: updateNodeOrder } = useMutation({
    mutationFn: (newNodes: NodeName[]) => nodeService.updateOrder(newNodes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["nodes", clientId] })
    },
    onError: (error) => {
      console.error("Erro ao reordenar nodes:", error)
      toast.error("Erro ao reordenar nodes")
    },
  })

  const { mutateAsync: updateNode } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<NodeName> }) =>
      nodeService.updateNode(id, data),
    onSuccess: () => {
      toast.success("Node atualizado com sucesso")
      queryClient.invalidateQueries({ queryKey: ["nodes", clientId] })
    },
    onError: (error) => {
      console.error("Erro ao editar node:", error)
      toast.error("Erro ao editar node")
    },
  })

  const { mutateAsync: deleteNode } = useMutation({
    mutationFn: (id: string) => nodeService.deleteNode(id),
    onSuccess: () => {
      toast.success("Node excluído com sucesso")
      queryClient.invalidateQueries({ queryKey: ["nodes", clientId] })
    },
    onError: (error) => {
      console.error("Erro ao excluir node:", error)
      toast.error("Erro ao excluir node")
    },
  })

  const { mutateAsync: createUnit } = useMutation({
    mutationFn: (data: { name: string, node_name_id: string }) =>
      unitService.createUnit({
        client_id: clientId,
        name: data.name,
        node_name_id: data.node_name_id,
      }),
    onSuccess: () => {
      toast.success("Unidade criada com sucesso")
      queryClient.invalidateQueries({ queryKey: ["units", clientId] })
    },
    onError: (error) => {
      console.error("Erro ao criar unidade:", error)
      toast.error("Erro ao criar unidade")
      throw error
    },
  })

  return {
    nodes,
    units,
    rootUnit,
    isLoading: isLoadingNodes || isLoadingUnits || isLoadingRootUnit,
    createNode,
    updateNodeOrder,
    updateNode,
    deleteNode,
    createUnit
  }
} 