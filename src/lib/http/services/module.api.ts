import axios from 'axios'
import type { ModuleRow, ModuleInsert, ModuleUpdate } from '@/lib/core/interfaces/module.interfaces'

const BASE_URL = '/api/modules'

export const moduleApi = {
  findAll: async () => {
    const { data } = await axios.get<ModuleRow[]>(BASE_URL)
    return data
  },

  create: async (moduleData: Partial<ModuleInsert>) => {
    const { data } = await axios.post<ModuleRow>(BASE_URL, moduleData)
    return data
  },

  update: async (id: string, moduleData: Partial<ModuleUpdate>) => {
    const { data } = await axios.put<ModuleRow>(BASE_URL, { id, ...moduleData })
    return data
  },

  delete: async (id: string) => {
    const { data } = await axios.delete(BASE_URL, { data: { id } })
    return data
  }
} 