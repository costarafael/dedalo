import { getBrowserClient } from '@/lib/database/supabase'
import { Module, NewModule } from '@/types/module'
import { IModuleRepository } from '../interfaces/repository.interfaces'

export class ModuleRepository implements IModuleRepository {
  private readonly table = 'modules'

  async findAll(): Promise<Module[]> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }

  async findById(id: string): Promise<Module | null> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  }

  async findActive(): Promise<Module[]> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .is('deleted_at', null)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }

  async findBySlug(slug: string): Promise<Module | null> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) throw error
    return data
  }

  async findLibraries(): Promise<Module[]> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('is_library', true)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }

  async create(data: NewModule): Promise<Module> {
    const supabase = getBrowserClient()
    const { data: created, error } = await supabase
      .from(this.table)
      .insert({
        ...data,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null
      })
      .select()
      .single()

    if (error) throw error
    return created
  }

  async update(id: string, data: Partial<Module>): Promise<Module> {
    const supabase = getBrowserClient()
    const { data: updated, error } = await supabase
      .from(this.table)
      .update({
        ...data,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return updated
  }

  async delete(id: string): Promise<void> {
    const supabase = getBrowserClient()
    const { error } = await supabase
      .from(this.table)
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  async softDelete(id: string): Promise<void> {
    const supabase = getBrowserClient()
    const { error } = await supabase
      .from(this.table)
      .update({ 
        deleted_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', id)

    if (error) throw error
  }
} 