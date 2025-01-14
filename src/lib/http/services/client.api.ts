import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../config/axios.config'
import type { ApiResponse } from '../types/api.types'
import type { Client } from '@/lib/core/interfaces/repository.interfaces'
import { ClientService } from '@/lib/core/services/client.service'
import { ClientRepository } from '@/lib/core/repositories/client.repository'

// Instância do serviço
const clientService = new ClientService(new ClientRepository())

// Keys para cache do React Query
export const clientKeys = {
  all: ['clients'] as const,
  lists: () => [...clientKeys.all, 'list'],
  list: (filters: any) => [...clientKeys.lists(), { filters }],
  details: () => [...clientKeys.all, 'detail'],
  detail: (id: string) => [...clientKeys.details(), id],
}

// Funções de API
export const clientApi = {
  getAll: async (): Promise<ApiResponse<Client[]>> => {
    const { data } = await api.get('/api/clients')
    return {
      data: data.map((item: Entity) => clientService.transformFromEntity(item)),
      status: 'success'
    }
  },

  getById: async (id: string): Promise<ApiResponse<Client>> => {
    const { data } = await api.get(`/api/clients/${id}`)
    return {
      data: clientService.transformFromEntity(data)
    }
  },

  create: async (client: Partial<Client>): Promise<ApiResponse<Client>> => {
    if (!clientService.validateClient(client)) {
      throw new Error('Invalid client data')
    }

    const entity = clientService.transformToEntity(client as Client)
    const { data } = await api.post('/api/clients', entity)
    
    return {
      data: clientService.transformFromEntity(data)
    }
  },

  update: async (id: string, client: Partial<Client>): Promise<ApiResponse<Client>> => {
    if (!clientService.validateClient(client)) {
      throw new Error('Invalid client data')
    }

    const entity = clientService.transformToEntity(client as Client)
    const { data } = await api.put(`/api/clients/${id}`, entity)
    
    return {
      ...data,
      data: clientService.transformFromEntity(data.data)
    }
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/clients/${id}`)
  }
}

// Hooks do React Query
export const useClients = () => {
  return useQuery({
    queryKey: clientKeys.lists(),
    queryFn: () => clientApi.getAll()
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
      queryClient.invalidateQueries({ queryKey: clientKeys.lists() })
    }
  })
}

export const useUpdateClient = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Client> }) => 
      clientApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: clientKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: clientKeys.lists() })
    }
  })
}

export const useDeleteClient = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: clientApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: clientKeys.lists() })
    }
  })
} 