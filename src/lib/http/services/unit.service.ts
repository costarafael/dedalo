import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../config/axios.config'
import type { ApiResponse, PaginatedResponse } from '../types/api.types'
import type { OrganizationalUnit, NewOrganizationalUnit } from '@/lib/core/interfaces'

// Keys para cache do React Query
export const unitKeys = {
  all: ['units'] as const,
  lists: () => [...unitKeys.all, 'list'] as const,
  list: (filters: any) => [...unitKeys.lists(), { filters }] as const,
  details: () => [...unitKeys.all, 'detail'] as const,
  detail: (id: string) => [...unitKeys.details(), id] as const,
  byClient: (clientId: string) => [...unitKeys.all, 'client', clientId] as const,
  root: (clientId: string) => [...unitKeys.all, 'root', clientId] as const,
}

// Funções de API
export const unitApi = {
  getAll: async (): Promise<ApiResponse<OrganizationalUnit[]>> => {
    const { data } = await api.get('/api/units')
    return data
  },

  getById: async (id: string): Promise<ApiResponse<OrganizationalUnit>> => {
    const { data } = await api.get(`/api/units/${id}`)
    return data
  },

  getByClient: async (clientId: string): Promise<ApiResponse<OrganizationalUnit[]>> => {
    const { data } = await api.get(`/api/units/client/${clientId}`)
    return data
  },

  getRootUnit: async (clientId: string): Promise<ApiResponse<OrganizationalUnit>> => {
    const { data } = await api.get(`/api/units/root/${clientId}`)
    return data
  },

  create: async (unit: NewOrganizationalUnit): Promise<ApiResponse<OrganizationalUnit>> => {
    const { data } = await api.post('/api/units', unit)
    return data
  },

  update: async (id: string, unit: Partial<OrganizationalUnit>): Promise<ApiResponse<OrganizationalUnit>> => {
    const { data } = await api.put(`/api/units/${id}`, unit)
    return data
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/units/${id}`)
  },

  validateNodeName: async (nodeNameId: string, clientId: string): Promise<ApiResponse<boolean>> => {
    const { data } = await api.get(`/api/units/validate-node`, {
      params: { nodeNameId, clientId }
    })
    return data
  }
}

// Hooks do React Query
export const useUnits = () => {
  return useQuery({
    queryKey: unitKeys.lists(),
    queryFn: () => unitApi.getAll()
  })
}

export const useUnit = (id: string) => {
  return useQuery({
    queryKey: unitKeys.detail(id),
    queryFn: () => unitApi.getById(id),
    enabled: !!id
  })
}

export const useClientUnits = (clientId: string) => {
  return useQuery({
    queryKey: unitKeys.byClient(clientId),
    queryFn: () => unitApi.getByClient(clientId),
    enabled: !!clientId
  })
}

export const useRootUnit = (clientId: string) => {
  return useQuery({
    queryKey: unitKeys.root(clientId),
    queryFn: () => unitApi.getRootUnit(clientId),
    enabled: !!clientId
  })
}

export const useCreateUnit = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: unitApi.create,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(unitKeys.lists())
      queryClient.invalidateQueries(unitKeys.byClient(variables.client_id))
    }
  })
}

export const useUpdateUnit = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<OrganizationalUnit> }) => 
      unitApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries(unitKeys.detail(id))
      queryClient.invalidateQueries(unitKeys.lists())
    }
  })
}

export const useDeleteUnit = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: unitApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(unitKeys.lists())
    }
  })
} 