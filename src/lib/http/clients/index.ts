import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Client, EntityUpdate } from "@/lib/core/interfaces/repository.interfaces"
import { ClientRepository } from "@/lib/core/repositories/client.repository"

// Singleton instance
const clientRepository = new ClientRepository()

// Query keys
export const clientKeys = {
  all: ["clients"] as const,
  detail: (id: string) => [...clientKeys.all, id] as const,
}

// Hooks
export function useClient(id: string) {
  return useQuery({
    queryKey: clientKeys.detail(id),
    queryFn: () => clientRepository.findById(id),
  })
}

export function useUpdateClient() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<EntityUpdate> }) =>
      clientRepository.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: clientKeys.detail(id) })
    },
  })
}

export function useDeleteClient() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => clientRepository.delete(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: clientKeys.detail(id) })
    },
  })
} 