import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/config/axios.config"
import { Client } from "@/lib/core/interfaces/repository.interfaces"

// Query keys
export const clientKeys = {
  all: ["clients"] as const,
  active: () => [...clientKeys.all, "active"] as const,
  detail: (id: string) => [...clientKeys.all, id] as const,
}

// Hooks
export function useClients() {
  return useQuery({
    queryKey: clientKeys.active(),
    queryFn: async () => {
      const { data } = await api.get<Client[]>("/api/clients")
      return data
    },
  })
}

export function useActiveClients() {
  const {
    data: clients = [],
    isLoading,
    error,
  } = useQuery<Client[]>({
    queryKey: clientKeys.active(),
    queryFn: () => clientService.getActiveClients(),
  })

  return {
    clients,
    isLoading,
    error,
  }
}

export function useClient(id: string) {
  const {
    data: client,
    isLoading,
    error,
  } = useQuery<Client | null>({
    queryKey: clientKeys.detail(id),
    queryFn: () => clientService.getClient(id),
  })

  return {
    client,
    isLoading,
    error,
  }
} 