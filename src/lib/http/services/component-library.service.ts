import axios from 'axios'
import type { ComponentLibrary, ComponentLibraryInsert, ComponentLibraryUpdate } from '@/lib/core/interfaces/component-library.interfaces'

class ComponentLibraryHttpService {
  private readonly baseUrl = '/api/component-library'

  async findAll(): Promise<ComponentLibrary[]> {
    try {
      const { data } = await axios.get<ComponentLibrary[]>(this.baseUrl)
      return data
    } catch (error) {
      console.error('Error finding all components:', error)
      throw new Error('Erro ao buscar componentes')
    }
  }

  async findActive(): Promise<ComponentLibrary[]> {
    try {
      const { data } = await axios.get<ComponentLibrary[]>(`${this.baseUrl}/active`)
      return data
    } catch (error) {
      console.error('Error finding active components:', error)
      throw new Error('Erro ao buscar componentes ativos')
    }
  }

  async findById(id: string): Promise<ComponentLibrary> {
    try {
      const { data } = await axios.get<ComponentLibrary>(`${this.baseUrl}/${id}`)
      return data
    } catch (error) {
      console.error('Error finding component by id:', error)
      throw new Error('Erro ao buscar componente')
    }
  }

  async create(data: ComponentLibraryInsert): Promise<ComponentLibrary> {
    try {
      const { data: response } = await axios.post<ComponentLibrary>(this.baseUrl, data)
      return response
    } catch (error) {
      console.error('Error creating component:', error)
      throw new Error('Erro ao criar componente')
    }
  }

  async update(id: string, data: ComponentLibraryUpdate): Promise<ComponentLibrary> {
    try {
      const { data: response } = await axios.put<ComponentLibrary>(this.baseUrl, { id, ...data })
      return response
    } catch (error) {
      console.error('Error updating component:', error)
      throw new Error('Erro ao atualizar componente')
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await axios.post(`${this.baseUrl}/delete`, { id })
    } catch (error) {
      console.error('Error deleting component:', error)
      throw new Error('Erro ao excluir componente')
    }
  }
}

export const componentLibraryHttpService = new ComponentLibraryHttpService() 