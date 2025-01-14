import { api } from '../config/axios.config'
import type { ApiResponse } from '../types/api.types'
import type { Provider, CreateProviderDTO } from '@/lib/core/interfaces/repository.interfaces'

// Funções de API
export const providerApi = {
  getAll: async (): Promise<Provider[]> => {
    const { data } = await api.get<Provider[]>('/api/providers')
    return data
  },

  getById: async (id: string): Promise<Provider> => {
    const { data } = await api.get<Provider>(`/api/providers/${id}`)
    return data
  },

  getByClient: async (clientId: string): Promise<Provider[]> => {
    const { data } = await api.get<Provider[]>(`/api/providers/client/${clientId}`)
    return data
  },

  create: async (provider: CreateProviderDTO): Promise<Provider> => {
    const { data } = await api.post<Provider>('/api/providers', provider)
    return data
  },

  update: async (id: string, provider: Partial<Provider>): Promise<Provider> => {
    const { data } = await api.put<Provider>(`/api/providers/${id}`, provider)
    return data
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/providers/${id}`)
  }
} 