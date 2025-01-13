import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../config/axios.config'
import type { ApiResponse } from '../types/api.types'
import type { NodeName, NewNodeName } from '@/lib/core/interfaces'

// Keys para cache do React Query
export const nodeKeys = {
  all: ['nodes'] as const,
  lists: () => [...nodeKeys.all, 'list'] as const,
  list: (filters: any) => [...nodeKeys.lists(), { filters }] as const,
  details: () => [...nodeKeys.all, 'detail'] as const,
  detail: (id: string) => [...nodeKeys.details(), id] as const,
  byClient: (clientId: string) => [...nodeKeys.all, 'client', clientId] as const,
  root: (clientId: string) => [...nodeKeys.all, 'root', clientId] as const,
}

// Funções de API
export const nodeApi = {
  getAll: async (): Promise<ApiResponse<NodeName[]>> => {
    const { data } = await api.get('/api/nodes')
    return data
  },

  getById: async (id: string): Promise<ApiResponse<NodeName>> => {
    const { data } = await api.get(`/api/nodes/${id}`)
    return data
  },

  getByClient: async (clientId: string): Promise<ApiResponse<NodeName[]>> => {
    const { data } = await api.get(`/api/nodes/client/${clientId}`)
    return data
  },

  getRootNode: async (clientId: string): Promise<ApiResponse<NodeName>> => {
    const { data } = await api.get(`/api/nodes/root/${clientId}`)
    return data
  },

  create: async (node: NewNodeName): Promise<ApiResponse<NodeName>> => {
    const { data } = await api.post('/api/nodes', node)
    return data
  },

  update: async (id: string, node: Partial<NodeName>): Promise<ApiResponse<NodeName>> => {
    const { data } = await api.put(`/api/nodes/${id}`, node)
    return data
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/nodes/${id}`)
  },

  validateName: async (name: string, clientId: string, excludeId?: string): Promise<ApiResponse<boolean>> => {
    const { data } = await api.get(`/api/nodes/validate-name`, {
      params: { name, clientId, excludeId }
    })
    return data
  }
}

// Hooks do React Query
export const useNodes = () => {
  return useQuery({
    queryKey: nodeKeys.lists(),
    queryFn: () => nodeApi.getAll()
  })
}

export const useNode = (id: string) => {
  return useQuery({
    queryKey: nodeKeys.detail(id),
    queryFn: () => nodeApi.getById(id),
    enabled: !!id
  })
}

export const useClientNodes = (clientId: string) => {
  return useQuery({
    queryKey: nodeKeys.byClient(clientId),
    queryFn: () => nodeApi.getByClient(clientId),
    enabled: !!clientId
  })
}

export const useRootNode = (clientId: string) => {
  return useQuery({
    queryKey: nodeKeys.root(clientId),
    queryFn: () => nodeApi.getRootNode(clientId),
    enabled: !!clientId
  })
}

export const useCreateNode = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: nodeApi.create,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(nodeKeys.lists())
      queryClient.invalidateQueries(nodeKeys.byClient(variables.client_id))
    }
  })
}

export const useUpdateNode = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<NodeName> }) => 
      nodeApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries(nodeKeys.detail(id))
      queryClient.invalidateQueries(nodeKeys.lists())
    }
  })
}

export const useDeleteNode = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: nodeApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(nodeKeys.lists())
    }
  })
} 