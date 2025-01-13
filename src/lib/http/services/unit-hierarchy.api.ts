import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../config/axios.config'
import type { ApiResponse } from '../types/api.types'
import type { UnitHierarchy, NewUnitHierarchy } from '@/lib/core/interfaces'

// Keys para cache do React Query
export const unitHierarchyKeys = {
  all: ['unit-hierarchies'] as const,
  lists: () => [...unitHierarchyKeys.all, 'list'],
  list: (filters: any) => [...unitHierarchyKeys.lists(), { filters }],
  details: () => [...unitHierarchyKeys.all, 'detail'],
  detail: (id: string) => [...unitHierarchyKeys.details(), id],
  byParent: (parentId: string) => [...unitHierarchyKeys.all, 'parent', parentId],
  byChild: (childId: string) => [...unitHierarchyKeys.all, 'child', childId],
  primaryPath: (unitId: string) => [...unitHierarchyKeys.all, 'primary-path', unitId],
}

// Funções de API
export const unitHierarchyApi = {
  getAll: async (): Promise<ApiResponse<UnitHierarchy[]>> => {
    const { data } = await api.get('/api/unit-hierarchies')
    return data
  },

  getById: async (id: string): Promise<ApiResponse<UnitHierarchy>> => {
    const { data } = await api.get(`/api/unit-hierarchies/${id}`)
    return data
  },

  getByParentId: async (parentId: string): Promise<ApiResponse<UnitHierarchy[]>> => {
    const { data } = await api.get(`/api/unit-hierarchies/parent/${parentId}`)
    return data
  },

  getByChildId: async (childId: string): Promise<ApiResponse<UnitHierarchy[]>> => {
    const { data } = await api.get(`/api/unit-hierarchies/child/${childId}`)
    return data
  },

  getPrimaryPath: async (unitId: string): Promise<ApiResponse<UnitHierarchy[]>> => {
    const { data } = await api.get(`/api/unit-hierarchies/primary-path/${unitId}`)
    return data
  },

  create: async (hierarchy: NewUnitHierarchy): Promise<ApiResponse<UnitHierarchy>> => {
    const { data } = await api.post('/api/unit-hierarchies', hierarchy)
    return data
  },

  update: async (id: string, hierarchy: Partial<UnitHierarchy>): Promise<ApiResponse<UnitHierarchy>> => {
    const { data } = await api.put(`/api/unit-hierarchies/${id}`, hierarchy)
    return data
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/unit-hierarchies/${id}`)
  },

  validateHierarchy: async (parentId: string, childId: string): Promise<ApiResponse<boolean>> => {
    const { data } = await api.get(`/api/unit-hierarchies/validate`, {
      params: { parentId, childId }
    })
    return data
  }
}

// Hooks do React Query
export const useUnitHierarchies = () => {
  return useQuery({
    queryKey: unitHierarchyKeys.lists(),
    queryFn: () => unitHierarchyApi.getAll()
  })
}

export const useUnitHierarchy = (id: string) => {
  return useQuery({
    queryKey: unitHierarchyKeys.detail(id),
    queryFn: () => unitHierarchyApi.getById(id),
    enabled: !!id
  })
}

export const useUnitChildren = (parentId: string) => {
  return useQuery({
    queryKey: unitHierarchyKeys.byParent(parentId),
    queryFn: () => unitHierarchyApi.getByParentId(parentId),
    enabled: !!parentId
  })
}

export const useUnitParents = (childId: string) => {
  return useQuery({
    queryKey: unitHierarchyKeys.byChild(childId),
    queryFn: () => unitHierarchyApi.getByChildId(childId),
    enabled: !!childId
  })
}

export const useUnitPrimaryPath = (unitId: string) => {
  return useQuery({
    queryKey: unitHierarchyKeys.primaryPath(unitId),
    queryFn: () => unitHierarchyApi.getPrimaryPath(unitId),
    enabled: !!unitId
  })
}

export const useCreateUnitHierarchy = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: unitHierarchyApi.create,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: unitHierarchyKeys.lists() })
      queryClient.invalidateQueries({ 
        queryKey: unitHierarchyKeys.byParent(variables.parent_unit_id)
      })
      queryClient.invalidateQueries({ 
        queryKey: unitHierarchyKeys.byChild(variables.child_unit_id)
      })
      queryClient.invalidateQueries({ 
        queryKey: unitHierarchyKeys.primaryPath(variables.child_unit_id)
      })
    }
  })
}

export const useUpdateUnitHierarchy = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<UnitHierarchy> }) => 
      unitHierarchyApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: unitHierarchyKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: unitHierarchyKeys.lists() })
    }
  })
}

export const useDeleteUnitHierarchy = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: unitHierarchyApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: unitHierarchyKeys.lists() })
    }
  })
} 