import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../config/axios.config'
import type { ApiResponse } from '../types/api.types'
import type { NodeHierarchyRule, NewNodeHierarchyRule } from '@/lib/core/interfaces'

// Keys para cache do React Query
export const nodeHierarchyKeys = {
  all: ['node-hierarchies'] as const,
  lists: () => [...nodeHierarchyKeys.all, 'list'],
  list: (filters: any) => [...nodeHierarchyKeys.lists(), { filters }],
  details: () => [...nodeHierarchyKeys.all, 'detail'],
  detail: (id: string) => [...nodeHierarchyKeys.details(), id],
  byParent: (parentId: string) => [...nodeHierarchyKeys.all, 'parent', parentId],
  byChild: (childId: string) => [...nodeHierarchyKeys.all, 'child', childId],
}

// Funções de API
export const nodeHierarchyApi = {
  getAll: async (): Promise<ApiResponse<NodeHierarchyRule[]>> => {
    const { data } = await api.get('/api/node-hierarchies')
    return data
  },

  getById: async (id: string): Promise<ApiResponse<NodeHierarchyRule>> => {
    const { data } = await api.get(`/api/node-hierarchies/${id}`)
    return data
  },

  getByParentId: async (parentId: string): Promise<ApiResponse<NodeHierarchyRule[]>> => {
    const { data } = await api.get(`/api/node-hierarchies/parent/${parentId}`)
    return data
  },

  getByChildId: async (childId: string): Promise<ApiResponse<NodeHierarchyRule[]>> => {
    const { data } = await api.get(`/api/node-hierarchies/child/${childId}`)
    return data
  },

  create: async (rule: NewNodeHierarchyRule): Promise<ApiResponse<NodeHierarchyRule>> => {
    const { data } = await api.post('/api/node-hierarchies', rule)
    return data
  },

  update: async (id: string, rule: Partial<NodeHierarchyRule>): Promise<ApiResponse<NodeHierarchyRule>> => {
    const { data } = await api.put(`/api/node-hierarchies/${id}`, rule)
    return data
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/node-hierarchies/${id}`)
  },

  validateRule: async (parentId: string, childId: string): Promise<ApiResponse<boolean>> => {
    const { data } = await api.get(`/api/node-hierarchies/validate`, {
      params: { parentId, childId }
    })
    return data
  }
}

// Hooks do React Query
export const useNodeHierarchies = () => {
  return useQuery({
    queryKey: nodeHierarchyKeys.lists(),
    queryFn: () => nodeHierarchyApi.getAll()
  })
}

export const useNodeHierarchy = (id: string) => {
  return useQuery({
    queryKey: nodeHierarchyKeys.detail(id),
    queryFn: () => nodeHierarchyApi.getById(id),
    enabled: !!id
  })
}

export const useNodeChildren = (parentId: string) => {
  return useQuery({
    queryKey: nodeHierarchyKeys.byParent(parentId),
    queryFn: () => nodeHierarchyApi.getByParentId(parentId),
    enabled: !!parentId
  })
}

export const useNodeParents = (childId: string) => {
  return useQuery({
    queryKey: nodeHierarchyKeys.byChild(childId),
    queryFn: () => nodeHierarchyApi.getByChildId(childId),
    enabled: !!childId
  })
}

export const useCreateNodeHierarchy = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: nodeHierarchyApi.create,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: nodeHierarchyKeys.lists() })
      queryClient.invalidateQueries({ 
        queryKey: nodeHierarchyKeys.byParent(variables.parent_node_id)
      })
      queryClient.invalidateQueries({ 
        queryKey: nodeHierarchyKeys.byChild(variables.child_node_id)
      })
    }
  })
}

export const useUpdateNodeHierarchy = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<NodeHierarchyRule> }) => 
      nodeHierarchyApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: nodeHierarchyKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: nodeHierarchyKeys.lists() })
    }
  })
}

export const useDeleteNodeHierarchy = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: nodeHierarchyApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: nodeHierarchyKeys.lists() })
    }
  })
} 