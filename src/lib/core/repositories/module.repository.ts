import { supabase } from '@/lib/database/supabase'
import { IModuleRepository, ModuleRow, ModuleComponentRow, ModuleDependencyRow, ModuleInstanceRow, ModuleInstanceUpdate, TABLES } from '../interfaces/repository.interfaces'

export class ModuleRepository implements IModuleRepository {
  async findAll(): Promise<ModuleRow[]> {
    const { data, error } = await supabase
      .from(TABLES.MODULES)
      .select('*')
      .is('deleted_at', null)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }

  async findActive(): Promise<ModuleRow[]> {
    const { data, error } = await supabase
      .from(TABLES.MODULES)
      .select('*')
      .eq('is_active', true)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }

  async findById(id: string): Promise<ModuleRow | null> {
    const { data, error } = await supabase
      .from(TABLES.MODULES)
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single()

    if (error) throw error
    return data
  }

  async findByClient(clientId: string): Promise<ModuleRow[]> {
    const { data, error } = await supabase
      .from(TABLES.MODULES)
      .select(`
        *,
        module_instances!inner(*)
      `)
      .eq('module_instances.client_id', clientId)
      .is('deleted_at', null)
      .is('module_instances.deleted_at', null)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }

  async findComponents(moduleId: string): Promise<ModuleComponentRow[]> {
    const { data, error } = await supabase
      .from(TABLES.MODULE_COMPONENTS)
      .select('*')
      .eq('module_id', moduleId)
      .is('deleted_at', null)
      .order('order', { ascending: true })

    if (error) throw error
    return data
  }

  async findDependencies(moduleId: string): Promise<ModuleDependencyRow[]> {
    const { data, error } = await supabase
      .from(TABLES.MODULE_DEPENDENCIES)
      .select(`
        *,
        dependency:modules(*)
      `)
      .eq('module_id', moduleId)
      .order('created_at', { ascending: true })

    if (error) throw error
    return data
  }

  async create(data: Partial<ModuleRow>): Promise<ModuleRow> {
    const now = new Date().toISOString()

    const { data: module, error } = await supabase
      .from(TABLES.MODULES)
      .insert({
        ...data,
        created_at: now,
        updated_at: now,
        is_active: true,
        is_library: false,
        version: 1,
        metadata: data.metadata || {}
      })
      .select()
      .single()

    if (error) throw error
    return module
  }

  async update(id: string, data: Partial<ModuleRow>): Promise<ModuleRow> {
    const { data: module, error } = await supabase
      .from(TABLES.MODULES)
      .update({
        ...data,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return module
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from(TABLES.MODULES)
      .update({
        deleted_at: new Date().toISOString(),
        is_active: false
      })
      .eq('id', id)

    if (error) throw error
  }

  async createInstance(moduleId: string, clientId: string, config?: any): Promise<ModuleInstanceRow> {
    const now = new Date().toISOString()

    const { data, error } = await supabase
      .from(TABLES.MODULE_INSTANCES)
      .insert({
        module_id: moduleId,
        client_id: clientId,
        config: config || {},
        created_at: now,
        updated_at: now,
        is_active: true,
        metadata: {}
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  async updateInstance(instanceId: string, data: Partial<ModuleInstanceUpdate>): Promise<ModuleInstanceRow> {
    const { data: instance, error } = await supabase
      .from(TABLES.MODULE_INSTANCES)
      .update({
        ...data,
        updated_at: new Date().toISOString()
      })
      .eq('id', instanceId)
      .select()
      .single()

    if (error) throw error
    return instance
  }

  async deleteInstance(instanceId: string): Promise<void> {
    const { error } = await supabase
      .from(TABLES.MODULE_INSTANCES)
      .update({
        deleted_at: new Date().toISOString(),
        is_active: false
      })
      .eq('id', instanceId)

    if (error) throw error
  }

  async findInstancesByClient(clientId: string): Promise<ModuleInstanceRow[]> {
    const { data, error } = await supabase
      .from(TABLES.MODULE_INSTANCES)
      .select(`
        *,
        module:${TABLES.MODULES}(*)
      `)
      .eq('client_id', clientId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }
} 