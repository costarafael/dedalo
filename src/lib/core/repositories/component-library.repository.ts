import { getServerClient } from '@/lib/database/supabase'
import type { ComponentLibrary, ComponentLibraryInsert, ComponentLibraryUpdate } from '../interfaces/component-library.interfaces'

export class ComponentLibraryRepository {
  private readonly table = 'component_library'
  private readonly supabase = getServerClient()

  async findAll(): Promise<ComponentLibrary[]> {
    try {
      const { data, error } = await this.supabase
        .from(this.table)
        .select('*')
        .is('deleted_at', null)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error finding all components:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        })
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Error finding all components:', error)
      throw error
    }
  }

  async findActive(): Promise<ComponentLibrary[]> {
    try {
      const { data, error } = await this.supabase
        .from(this.table)
        .select('*')
        .eq('is_active', true)
        .is('deleted_at', null)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error finding active components:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        })
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Error finding active components:', error)
      throw error
    }
  }

  async findById(id: string): Promise<ComponentLibrary | null> {
    try {
      const { data, error } = await this.supabase
        .from(this.table)
        .select('*')
        .eq('id', id)
        .is('deleted_at', null)
        .single()

      if (error) {
        console.error('Error finding component by id:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        })
        throw error
      }

      return data
    } catch (error) {
      console.error('Error finding component by id:', error)
      throw error
    }
  }

  async create(data: ComponentLibraryInsert): Promise<ComponentLibrary> {
    try {
      const now = new Date().toISOString()

      const { data: component, error } = await this.supabase
        .from(this.table)
        .insert({
          ...data,
          created_at: now,
          updated_at: now,
          is_active: data.is_active ?? true,
          is_latest_version: data.is_latest_version ?? true,
          version: data.version ?? '1.0.0',
          config: data.config ?? {},
          metadata: data.metadata ?? null,
          validation: data.validation ?? null
        })
        .select('*')
        .single()

      if (error) {
        console.error('Error creating component:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        })
        throw error
      }

      return component
    } catch (error) {
      console.error('Error creating component:', error)
      throw error
    }
  }

  async update(id: string, data: ComponentLibraryUpdate): Promise<ComponentLibrary> {
    try {
      const { data: component, error } = await this.supabase
        .from(this.table)
        .update({
          ...data,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Error updating component:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        })
        throw error
      }

      return component
    } catch (error) {
      console.error('Error updating component:', error)
      throw error
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const { error } = await this.supabase
        .from(this.table)
        .update({
          deleted_at: new Date().toISOString(),
          is_active: false
        })
        .eq('id', id)

      if (error) {
        console.error('Error deleting component:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        })
        throw error
      }
    } catch (error) {
      console.error('Error deleting component:', error)
      throw error
    }
  }
} 