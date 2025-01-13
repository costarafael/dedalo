import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../config/axios.config'
import type { ApiResponse } from '../types/api.types'
import type { NodeName } from '@/lib/core/interfaces/repository.interfaces'
import { NodeService } from '@/lib/core/services/node.service'
import { NodeRepository } from '@/lib/core/repositories/node.repository'
import { NodeHierarchyRepository } from '@/lib/core/repositories/node-hierarchy.repository'

// Instância do serviço
const nodeService = new NodeService(new NodeRepository(), new NodeHierarchyRepository())

// Keys para cache do React Query
export const nodeKeys = {
  all: ['nodes'] as const,
  lists: () => [...nodeKeys.all, 'list'],
  list: (filters: any) => [...nodeKeys.lists(), { filters }],
  details: () => [...nodeKeys.all, 'detail'],
  detail: (id: string) => [...nodeKeys.details(), id],
  byClient: (clientId: string) => [...nodeKeys.all, 'client', clientId],
  root: (clientId: string) => [...nodeKeys.all, 'root', clientId],
}

// Funções de API
export const nodeApi = {
  getAll: async (): Promise<ApiResponse<NodeName[]>> => {
    const { data } = await api.get('/api/nodes')
    return {
      ...data,
      data: data.data.map((item: any) => nodeService.transformNodeData(item))
    }
  },

  getById: async (id: string): Promise<ApiResponse<NodeName>> => {
    const { data } = await api.get(`/api/nodes/${id}`)
    return {
      ...data,
      data: nodeService.transformNodeData(data.data)
    }
  },

  getByClient: async (clientId: string): Promise<ApiResponse<NodeName[]>> => {
    const { data } = await api.get(`/api/nodes/client/${clientId}`)
    return {
      ...data,
      data: data.data.map((item: any) => nodeService.transformNodeData(item))
    }
  },

  getRootNode: async (clientId: string): Promise<ApiResponse<NodeName>> => {
    const { data } = await api.get(`/api/nodes/root/${clientId}`)
    return {
      ...data,
      data: nodeService.transformNodeData(data.data)
    }
  },

  create: async (node: Partial<NodeName>): Promise<ApiResponse<NodeName>> => {
    if (!nodeService.validateNode(node)) {
      throw new Error('Invalid node data')
    }

    // Validar nome único
    if (node.name && node.client_id) {
      const isValidName = await nodeService.validateNodeName(
        node.name,
        node.client_id
      )
      if (!isValidName) {
        throw new Error('Node name already exists')
      }
    } else {
      throw new Error('Name and client are required')
    }

    const { data } = await api.post('/api/nodes', node)
    return {
      ...data,
      data: nodeService.transformNodeData(data.data)
    }
  },

  update: async (id: string, node: Partial<NodeName>): Promise<ApiResponse<NodeName>> => {
    if (!nodeService.validateNode(node)) {
      throw new Error('Invalid node data')
    }

    // Validar nome único
    if (node.name && node.client_id) {
      const isValidName = await nodeService.validateNodeName(
        node.name,
        node.client_id,
        id
      )
      if (!isValidName) {
        throw new Error('Node name already exists')
      }
    }

    const { data } = await api.put(`/api/nodes/${id}`, node)
    return {
      ...data,
      data: nodeService.transformNodeData(data.data)
    }
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
      queryClient.invalidateQueries({ queryKey: nodeKeys.lists() })
      if (variables.client_id) {
        queryClient.invalidateQueries({ 
          queryKey: nodeKeys.byClient(variables.client_id)
        })
      }
    }
  })
}

export const useUpdateNode = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<NodeName> }) => 
      nodeApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: nodeKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: nodeKeys.lists() })
    }
  })
}

export const useDeleteNode = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: nodeApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: nodeKeys.lists() })
    }
  })
} 