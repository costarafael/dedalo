import { Database } from '@/types/supabase'

export type ModuleRow = Database['public']['Tables']['modules']['Row']
export type ModuleInsert = Database['public']['Tables']['modules']['Insert']
export type ModuleUpdate = Database['public']['Tables']['modules']['Update']

export type ModuleComponentRow = Database['public']['Tables']['module_components']['Row']
export type ModuleComponentInsert = Database['public']['Tables']['module_components']['Insert']
export type ModuleComponentUpdate = Database['public']['Tables']['module_components']['Update']

export type ModuleDependencyRow = Database['public']['Tables']['module_dependencies']['Row']
export type ModuleDependencyInsert = Database['public']['Tables']['module_dependencies']['Insert']
export type ModuleDependencyUpdate = Database['public']['Tables']['module_dependencies']['Update']

export type ModuleInstanceRow = Database['public']['Tables']['module_instances']['Row']
export type ModuleInstanceInsert = Database['public']['Tables']['module_instances']['Insert']
export type ModuleInstanceUpdate = Database['public']['Tables']['module_instances']['Update']

export interface IModuleService {
  findAll(): Promise<ModuleRow[]>
  findActive(): Promise<ModuleRow[]>
  findById(id: string): Promise<ModuleRow | null>
  findByClient(clientId: string): Promise<ModuleRow[]>
  create(data: Partial<ModuleInsert>): Promise<ModuleRow>
  update(id: string, data: Partial<ModuleUpdate>): Promise<ModuleRow>
  delete(id: string): Promise<void>
  
  // Instance methods
  createInstance(moduleId: string, clientId: string, config?: any): Promise<ModuleInstanceRow>
  updateInstance(instanceId: string, data: Partial<ModuleInstanceUpdate>): Promise<ModuleInstanceRow>
  deleteInstance(instanceId: string): Promise<void>
  findInstancesByClient(clientId: string): Promise<ModuleInstanceRow[]>
} 