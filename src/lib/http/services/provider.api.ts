import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../config/axios.config'
import type { ApiResponse } from '../types/api.types'
import type { Provider, CreateProviderDTO } from '@/lib/core/interfaces/repository.interfaces'

// Keys para cache do React Query
export const providerKeys = {
  all: ['providers'] as const,
  lists: () => [...providerKeys.all, 'list'],
  list: (filters: any) => [...providerKeys.lists(), { filters }],
  details: () => [...providerKeys.all, 'detail'],
  detail: (id: string) => [...providerKeys.details(), id],
  byClient: (clientId: string) => [...providerKeys.all, 'client', clientId],
}

// Funções de API
export const providerApi = {
  getAll: async (): Promise<ApiResponse<Provider[]>> => {
    const { data } = await api.get('/api/providers')
    return data
  },

  getById: async (id: string): Promise<ApiResponse<Provider>> => {
    const { data } = await api.get(`/api/providers/${id}`)
    return data
  },

  getByClient: async (clientId: string): Promise<ApiResponse<Provider[]>> => {
    const { data } = await api.get(`/api/providers/client/${clientId}`)
    return data
  },

  create: async (provider: CreateProviderDTO): Promise<ApiResponse<Provider>> => {
    const { data } = await api.post('/api/providers', provider)
    return data
  },

  update: async (id: string, provider: Partial<Provider>): Promise<ApiResponse<Provider>> => {
    const { data } = await api.put(`/api/providers/${id}`, provider)
    return data
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/providers/${id}`)
  }
}

// Hooks do React Query
export const useProviders = () => {
  return useQuery({
    queryKey: providerKeys.lists(),
    queryFn: () => providerApi.getAll()
  })
}

export const useProvider = (id: string) => {
  return useQuery({
    queryKey: providerKeys.detail(id),
    queryFn: () => providerApi.getById(id),
    enabled: !!id
  })
}

export const useClientProviders = (clientId: string) => {
  return useQuery({
    queryKey: providerKeys.byClient(clientId),
    queryFn: () => providerApi.getByClient(clientId),
    enabled: !!clientId
  })
}

export const useCreateProvider = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: providerApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: providerKeys.lists() })
    }
  })
}

export const useUpdateProvider = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Provider> }) => 
      providerApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: providerKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: providerKeys.lists() })
    }
  })
}

export const useDeleteProvider = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: providerApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: providerKeys.lists() })
    }
  })
} 