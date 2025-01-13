import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../config/axios.config'
import type { ApiResponse } from '../types/api.types'
import type { OrganizationalUnit } from '@/lib/core/interfaces/repository.interfaces'
import { UnitService } from '@/lib/core/services/unit.service'
import { UnitRepository } from '@/lib/core/repositories/unit.repository'
import { NodeRepository } from '@/lib/core/repositories/node.repository'

// Instância do serviço
const unitService = new UnitService(new UnitRepository(), new NodeRepository())

// Keys para cache do React Query
export const unitKeys = {
  all: ['units'] as const,
  lists: () => [...unitKeys.all, 'list'],
  list: (filters: any) => [...unitKeys.lists(), { filters }],
  details: () => [...unitKeys.all, 'detail'],
  detail: (id: string) => [...unitKeys.details(), id],
  byClient: (clientId: string) => [...unitKeys.all, 'client', clientId],
  root: (clientId: string) => [...unitKeys.all, 'root', clientId],
}

// Funções de API
export const unitApi = {
  getAll: async (): Promise<ApiResponse<OrganizationalUnit[]>> => {
    const { data } = await api.get('/api/units')
    return {
      ...data,
      data: data.data.map((item: any) => unitService.transformUnitData(item))
    }
  },

  getById: async (id: string): Promise<ApiResponse<OrganizationalUnit>> => {
    const { data } = await api.get(`/api/units/${id}`)
    return {
      ...data,
      data: unitService.transformUnitData(data.data)
    }
  },

  getByClient: async (clientId: string): Promise<ApiResponse<OrganizationalUnit[]>> => {
    const { data } = await api.get(`/api/units/client/${clientId}`)
    return {
      ...data,
      data: data.data.map((item: any) => unitService.transformUnitData(item))
    }
  },

  getRootUnit: async (clientId: string): Promise<ApiResponse<OrganizationalUnit>> => {
    const { data } = await api.get(`/api/units/root/${clientId}`)
    return {
      ...data,
      data: unitService.transformUnitData(data.data)
    }
  },

  create: async (unit: Partial<OrganizationalUnit>): Promise<ApiResponse<OrganizationalUnit>> => {
    if (!unitService.validateUnit(unit)) {
      throw new Error('Invalid unit data')
    }

    // Validar associação do nó
    if (unit.node_name_id && unit.client_id) {
      const isValidNode = await unitService.validateNodeAssignment(
        unit.node_name_id,
        unit.client_id
      )
      if (!isValidNode) {
        throw new Error('Invalid node assignment')
      }
    } else {
      throw new Error('Node and client are required')
    }

    const { data } = await api.post('/api/units', unit)
    return {
      ...data,
      data: unitService.transformUnitData(data.data)
    }
  },

  update: async (id: string, unit: Partial<OrganizationalUnit>): Promise<ApiResponse<OrganizationalUnit>> => {
    if (!unitService.validateUnit(unit)) {
      throw new Error('Invalid unit data')
    }

    // Validar associação do nó
    if (unit.node_name_id && unit.client_id) {
      const isValidNode = await unitService.validateNodeAssignment(
        unit.node_name_id,
        unit.client_id
      )
      if (!isValidNode) {
        throw new Error('Invalid node assignment')
      }
    }

    const { data } = await api.put(`/api/units/${id}`, unit)
    return {
      ...data,
      data: unitService.transformUnitData(data.data)
    }
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
      queryClient.invalidateQueries({ queryKey: unitKeys.lists() })
      queryClient.invalidateQueries({ 
        queryKey: unitKeys.byClient(variables.client_id)
      })
    }
  })
}

export const useUpdateUnit = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<OrganizationalUnit> }) => 
      unitApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: unitKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: unitKeys.lists() })
    }
  })
}

export const useDeleteUnit = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: unitApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: unitKeys.lists() })
    }
  })
} 