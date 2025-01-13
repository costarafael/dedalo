import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../config/axios.config'
import type { ApiResponse } from '../types/api.types'
import type { UnitContainer, NewUnitContainer, UnitContainerItem } from '@/lib/core/interfaces'

// Keys para cache do React Query
export const unitContainerKeys = {
  all: ['unit-containers'] as const,
  lists: () => [...unitContainerKeys.all, 'list'],
  list: (filters: any) => [...unitContainerKeys.lists(), { filters }],
  details: () => [...unitContainerKeys.all, 'detail'],
  detail: (id: string) => [...unitContainerKeys.details(), id],
  byClient: (clientId: string) => [...unitContainerKeys.all, 'client', clientId],
  units: (containerId: string) => [...unitContainerKeys.all, 'units', containerId],
}

// Funções de API
export const unitContainerApi = {
  getAll: async (): Promise<ApiResponse<UnitContainer[]>> => {
    const { data } = await api.get('/api/unit-containers')
    return data
  },

  getById: async (id: string): Promise<ApiResponse<UnitContainer>> => {
    const { data } = await api.get(`/api/unit-containers/${id}`)
    return data
  },

  getByClient: async (clientId: string): Promise<ApiResponse<UnitContainer[]>> => {
    const { data } = await api.get(`/api/unit-containers/client/${clientId}`)
    return data
  },

  create: async (container: NewUnitContainer): Promise<ApiResponse<UnitContainer>> => {
    const { data } = await api.post('/api/unit-containers', container)
    return data
  },

  update: async (id: string, container: Partial<UnitContainer>): Promise<ApiResponse<UnitContainer>> => {
    const { data } = await api.put(`/api/unit-containers/${id}`, container)
    return data
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/unit-containers/${id}`)
  },

  getUnits: async (containerId: string): Promise<ApiResponse<UnitContainerItem[]>> => {
    const { data } = await api.get(`/api/unit-containers/${containerId}/units`)
    return data
  },

  addUnit: async (containerId: string, unitId: string): Promise<ApiResponse<UnitContainerItem>> => {
    const { data } = await api.post(`/api/unit-containers/${containerId}/units`, { unitId })
    return data
  },

  removeUnit: async (containerId: string, unitId: string): Promise<void> => {
    await api.delete(`/api/unit-containers/${containerId}/units/${unitId}`)
  }
}

// Hooks do React Query
export const useUnitContainers = () => {
  return useQuery({
    queryKey: unitContainerKeys.lists(),
    queryFn: () => unitContainerApi.getAll()
  })
}

export const useUnitContainer = (id: string) => {
  return useQuery({
    queryKey: unitContainerKeys.detail(id),
    queryFn: () => unitContainerApi.getById(id),
    enabled: !!id
  })
}

export const useClientContainers = (clientId: string) => {
  return useQuery({
    queryKey: unitContainerKeys.byClient(clientId),
    queryFn: () => unitContainerApi.getByClient(clientId),
    enabled: !!clientId
  })
}

export const useContainerUnits = (containerId: string) => {
  return useQuery({
    queryKey: unitContainerKeys.units(containerId),
    queryFn: () => unitContainerApi.getUnits(containerId),
    enabled: !!containerId
  })
}

export const useCreateUnitContainer = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: unitContainerApi.create,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: unitContainerKeys.lists() })
      queryClient.invalidateQueries({ 
        queryKey: unitContainerKeys.byClient(variables.client_id)
      })
    }
  })
}

export const useUpdateUnitContainer = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<UnitContainer> }) => 
      unitContainerApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: unitContainerKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: unitContainerKeys.lists() })
    }
  })
}

export const useDeleteUnitContainer = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: unitContainerApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: unitContainerKeys.lists() })
    }
  })
}

export const useAddUnitToContainer = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ containerId, unitId }: { containerId: string; unitId: string }) => 
      unitContainerApi.addUnit(containerId, unitId),
    onSuccess: (_, { containerId }) => {
      queryClient.invalidateQueries({ 
        queryKey: unitContainerKeys.units(containerId)
      })
    }
  })
}

export const useRemoveUnitFromContainer = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ containerId, unitId }: { containerId: string; unitId: string }) => 
      unitContainerApi.removeUnit(containerId, unitId),
    onSuccess: (_, { containerId }) => {
      queryClient.invalidateQueries({ 
        queryKey: unitContainerKeys.units(containerId)
      })
    }
  })
} 