import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../config/axios.config'
import type { ApiResponse, PaginatedResponse } from '../types/api.types'
import type { Entity } from '@/lib/core/interfaces'

// Keys para cache do React Query
export const clientKeys = {
  all: ['clients'] as const,
  lists: () => [...clientKeys.all, 'list'] as const,
  list: (filters: any) => [...clientKeys.lists(), { filters }] as const,
  details: () => [...clientKeys.all, 'detail'] as const,
  detail: (id: string) => [...clientKeys.details(), id] as const,
}

// Funções de API
export const clientApi = {
  getAll: async (): Promise<ApiResponse<Entity[]>> => {
    const { data } = await api.get('/clients')
    return data
  },

  getById: async (id: string): Promise<ApiResponse<Entity>> => {
    const { data } = await api.get(`/clients/${id}`)
    return data
  },

  create: async (client: Partial<Entity>): Promise<ApiResponse<Entity>> => {
    const { data } = await api.post('/clients', client)
    return data
  },

  update: async (id: string, client: Partial<Entity>): Promise<ApiResponse<Entity>> => {
    const { data } = await api.put(`/clients/${id}`, client)
    return data
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/clients/${id}`)
  },

  getPaginated: async (page: number = 1, limit: number = 10): Promise<PaginatedResponse<Entity>> => {
    const { data } = await api.get('/clients', {
      params: { page, limit }
    })
    return data
  }
}

// Hooks do React Query
export const useClients = (page?: number, limit?: number) => {
  return useQuery({
    queryKey: clientKeys.list({ page, limit }),
    queryFn: () => clientApi.getPaginated(page, limit),
    keepPreviousData: true
  })
}

export const useClient = (id: string) => {
  return useQuery({
    queryKey: clientKeys.detail(id),
    queryFn: () => clientApi.getById(id),
    enabled: !!id
  })
}

export const useCreateClient = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: clientApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries(clientKeys.lists())
    }
  })
}

export const useUpdateClient = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Entity> }) => 
      clientApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries(clientKeys.detail(id))
      queryClient.invalidateQueries(clientKeys.lists())
    }
  })
}

export const useDeleteClient = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: clientApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(clientKeys.lists())
    }
  })
} 