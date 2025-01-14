import { useQuery } from "@tanstack/react-query"
import { clientApi } from "@/lib/http/services/client.api"
import { clientKeys } from "@/lib/core/services/query-keys"
import { Client } from "@/lib/core/interfaces/repository.interfaces"

export function useClients() {
  const { data, isLoading, error } = useQuery({
    queryKey: clientKeys.lists(),
    queryFn: () => clientApi.getAll(),
  })

  return {
    clients: data?.data || [] as Client[],
    isLoading,
    error,
  }
} 