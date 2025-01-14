import { useQuery } from "@tanstack/react-query"
import { clientService } from "@/lib/core/services/client.service"
import { clientKeys } from "@/lib/core/services/query-keys"
import { Client } from "@/lib/core/interfaces/repository.interfaces"

export function useClients() {
  const { data, isLoading, error } = useQuery({
    queryKey: clientKeys.lists(),
    queryFn: () => clientService.getAllClients(),
  })

  return {
    clients: data || [] as Client[],
    isLoading,
    error,
  }
} 