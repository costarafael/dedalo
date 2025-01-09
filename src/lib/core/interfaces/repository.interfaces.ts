import { Database } from '@/types/supabase'

// Enums
export enum ContextType {
  ADMIN = 'ADMIN',
  AGENCY = 'AGENCY',
  CLIENT = 'CLIENT',
  PROVIDER = 'PROVIDER'
}

// Tipos base do Supabase
export interface Entity {
  id: string
  name: string
  type: ContextType
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface OrganizationalUnit {
  id: string
  client_id: string
  node_name_id: string
  name: string
  type: 'ROOT' | 'CATEGORY' | 'OPTION'
  depth: number
  is_active: boolean
  metadata: Record<string, any> | null
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export type NewOrganizationalUnit = Omit<OrganizationalUnit, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>

// Interface base para repositories
export interface IBaseRepository<T, CreateDTO = any, UpdateDTO = Partial<T>> {
  findAll(): Promise<T[]>
  findById(id: string): Promise<T | null>
  create(data: CreateDTO): Promise<T>
  update(id: string, data: UpdateDTO): Promise<T>
  delete(id: string): Promise<void>
}

// Interface específica para Client Repository
export interface IClientRepository extends IBaseRepository<Entity> {
  findActive(): Promise<Entity[]>
}

// Interface específica para Organizational Unit Repository
export interface IUnitRepository extends IBaseRepository<OrganizationalUnit, NewOrganizationalUnit> {
  findByClientId(clientId: string): Promise<OrganizationalUnit[]>
  findRootUnit(clientId: string): Promise<OrganizationalUnit | null>
}

// Interface específica para Node Repository
export interface INodeRepository extends IBaseRepository<OrganizationalUnit> {
  findByType(type: string): Promise<OrganizationalUnit[]>
}

// Interface específica para Container Repository
export interface IContainerRepository extends IBaseRepository<OrganizationalUnit> {
  findByClientId(clientId: string): Promise<OrganizationalUnit[]>
} 