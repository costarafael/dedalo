import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/config/axios.config"
import { Provider } from "@/lib/core/interfaces/repository.interfaces"
import { toast } from "sonner"

export const providerKeys = {
  all: ["providers"] as const,
  byClient: (clientId: string) => [...providerKeys.all, "client", clientId] as const,
  detail: (id: string) => [...providerKeys.all, id] as const,
}

export function useProviders() {
  const { data, isLoading } = useQuery({
    queryKey: providerKeys.all,
    queryFn: async () => {
      const { data } = await api.get<Provider[]>("/api/providers")
      return data
    },
  })

  return {
    providers: data || [],
    isLoading,
  }
}

export function useProvidersByClient(clientId: string) {
  const { data, isLoading } = useQuery({
    queryKey: providerKeys.byClient(clientId),
    queryFn: async () => {
      const { data } = await api.get<Provider[]>(`/api/providers/client/${clientId}`)
      return data
    },
    enabled: !!clientId,
  })

  return {
    data: data || [],
    isLoading,
  }
}

export function useProvider(id: string) {
  const { data, isLoading } = useQuery({
    queryKey: providerKeys.detail(id),
    queryFn: async () => {
      const { data } = await api.get<Provider>(`/api/providers/${id}`)
      return data
    },
    enabled: !!id,
  })

  return {
    data,
    isLoading,
  }
}

export function useCreateProvider() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: { name: string; client_id?: string; parent_provider_id?: string }) => {
      const response = await api.post<Provider>("/api/providers", data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: providerKeys.all })
    },
  })
}

export function useUpdateProvider() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string
      data: Partial<Provider>
    }) => {
      const response = await api.put<Provider>(`/api/providers/${id}`, data)
      return response.data
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: providerKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: providerKeys.all })
    },
  })
}

export function useDeleteProvider() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/api/providers/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: providerKeys.all })
    },
  })
} 