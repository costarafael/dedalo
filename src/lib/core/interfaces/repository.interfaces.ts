import { Database } from '@/types/supabase'
import { Json } from '@/types/supabase'

// Constantes para tabelas
export const TABLES = {
  ENTITY: 'entity',
  ORGANIZATIONAL_UNITS: 'organizational_units',
  NODE_NAMES: 'node_names',
  NODE_HIERARCHY_RULES: 'node_hierarchy_rules',
  UNIT_HIERARCHIES: 'unit_hierarchies',
  UNIT_CONTAINERS: 'unit_containers',
  UNIT_CONTAINER_ITEMS: 'unit_container_items',
  PROVIDER_HIERARCHIES: 'provider_hierarchies',
  MODULES: 'modules',
  MODULE_COMPONENTS: 'module_components',
  MODULE_DEPENDENCIES: 'module_dependencies',
  MODULE_INSTANCES: 'module_instances'
} as const

// Tipos do Supabase
type Tables = Database['public']['Tables']

// Entity types
export type EntityRow = Tables['entity']['Row']
export type EntityInsert = Tables['entity']['Insert']
export type EntityUpdate = Tables['entity']['Update']

// Organizational Unit types
export type OrganizationalUnitRow = Tables['organizational_units']['Row']
export type OrganizationalUnitInsert = Tables['organizational_units']['Insert']
export type OrganizationalUnitUpdate = Tables['organizational_units']['Update']

// Node Name types
export type NodeNameRow = Tables['node_names']['Row']
export type NodeNameInsert = Tables['node_names']['Insert']
export type NodeNameUpdate = Tables['node_names']['Update']

// Node Hierarchy Rule types
export type NodeHierarchyRuleRow = Tables['node_hierarchy_rules']['Row']
export type NodeHierarchyRuleInsert = Tables['node_hierarchy_rules']['Insert']
export type NodeHierarchyRuleUpdate = Tables['node_hierarchy_rules']['Update']

// Unit Hierarchy types
export type UnitHierarchyRow = Tables['unit_hierarchies']['Row']
export type UnitHierarchyInsert = Tables['unit_hierarchies']['Insert']
export type UnitHierarchyUpdate = Tables['unit_hierarchies']['Update']

// Unit Container types
export type UnitContainerRow = Tables['unit_containers']['Row']
export type UnitContainerInsert = Tables['unit_containers']['Insert']
export type UnitContainerUpdate = Tables['unit_containers']['Update']

// Unit Container Item types
export type UnitContainerItemRow = Tables['unit_container_items']['Row']
export type UnitContainerItemInsert = Tables['unit_container_items']['Insert']
export type UnitContainerItemUpdate = Tables['unit_container_items']['Update']

// Provider types
export type ProviderHierarchyRow = Tables['provider_hierarchies']['Row']
export type ProviderHierarchyInsert = Tables['provider_hierarchies']['Insert']
export type ProviderHierarchyUpdate = Tables['provider_hierarchies']['Update']

export interface Provider extends Entity {
  type: typeof CONTEXT_TYPES.PROVIDER
  provider_hierarchies?: Array<{
    client_id: string | null
    parent_provider_id: string | null
    root_provider_id: string | null
    client?: {
      id: string
      name: string
    } | null
  }>
}

export interface CreateProviderDTO {
  name: string
  parent_provider_id?: string | null
  client_id?: string | null
}

// Enums
export type ContextType = Database["public"]["Enums"]["ContextType"]
export const CONTEXT_TYPES = {
  ADMIN: 'ADMIN',
  AGENCY: 'AGENCY',
  CLIENT: 'CLIENT',
  PROVIDER: 'PROVIDER'
} as const

export type NodeType = Database["public"]["Enums"]["NodeType"]
export const NODE_TYPES = {
  ROOT: 'ROOT',
  CATEGORY: 'CATEGORY',
  OPTION: 'OPTION'
} as const

// Interfaces base
export interface Entity extends EntityRow {}
export interface OrganizationalUnit extends OrganizationalUnitRow {}
export interface NodeName extends NodeNameRow {}
export interface NodeHierarchyRule extends NodeHierarchyRuleRow {}
export interface UnitHierarchy extends UnitHierarchyRow {}
export interface UnitContainer extends UnitContainerRow {}
export interface UnitContainerItem extends UnitContainerItemRow {}

// Tipos para criação
export type NewOrganizationalUnit = OrganizationalUnitInsert
export type NewNodeName = NodeNameInsert
export type NewNodeHierarchyRule = NodeHierarchyRuleInsert
export type NewUnitHierarchy = UnitHierarchyInsert
export type NewUnitContainer = UnitContainerInsert
export type NewUnitContainerItem = UnitContainerItemInsert

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
export interface INodeRepository extends IBaseRepository<NodeName, NewNodeName> {
  findByClientId(clientId: string): Promise<NodeName[]>
  findRootNode(clientId: string): Promise<NodeName | null>
}

// Interface específica para Node Hierarchy Repository
export interface INodeHierarchyRepository extends IBaseRepository<NodeHierarchyRule, NewNodeHierarchyRule> {
  findByParentId(parentId: string): Promise<NodeHierarchyRule[]>
  findByChildId(childId: string): Promise<NodeHierarchyRule[]>
}

// Interface específica para Unit Hierarchy Repository
export interface IUnitHierarchyRepository extends IBaseRepository<UnitHierarchy, NewUnitHierarchy> {
  findByParentId(parentId: string): Promise<UnitHierarchy[]>
  findByChildId(childId: string): Promise<UnitHierarchy[]>
  findPrimaryPath(unitId: string): Promise<UnitHierarchy[]>
}

// Interface específica para Unit Container Repository
export interface IUnitContainerRepository extends IBaseRepository<UnitContainer, NewUnitContainer> {
  findByClientId(clientId: string): Promise<UnitContainer[]>
  addUnit(containerId: string, unitId: string): Promise<UnitContainerItem>
  removeUnit(containerId: string, unitId: string): Promise<void>
  getUnits(containerId: string): Promise<OrganizationalUnit[]>
}

// Interface específica para Provider Repository
export interface IProviderRepository extends IBaseRepository<Provider, CreateProviderDTO> {
  findByClient(clientId: string): Promise<Provider[]>
  findChildren(providerId: string): Promise<Provider[]>
  findHierarchy(providerId: string): Promise<ProviderHierarchyRow[]>
  addToHierarchy(providerId: string, parentId: string, clientId?: string): Promise<ProviderHierarchyRow>
  removeFromHierarchy(providerId: string, parentId: string): Promise<void>
}

// Interface específica para Module Repository
export interface IModuleRepository extends IBaseRepository<ModuleRow> {
  findActive(): Promise<ModuleRow[]>
  findByClient(clientId: string): Promise<ModuleRow[]>
  findComponents(moduleId: string): Promise<ModuleComponentRow[]>
  findDependencies(moduleId: string): Promise<ModuleDependencyRow[]>
  createInstance(moduleId: string, clientId: string, config?: Json): Promise<ModuleInstanceRow>
  updateInstance(instanceId: string, data: Partial<ModuleInstanceUpdate>): Promise<ModuleInstanceRow>
  deleteInstance(instanceId: string): Promise<void>
  findInstancesByClient(clientId: string): Promise<ModuleInstanceRow[]>
}

// Module types
export type ModuleRow = Tables['modules']['Row']
export type ModuleInsert = Tables['modules']['Insert']
export type ModuleUpdate = Tables['modules']['Update']

export type ModuleComponentRow = Tables['module_components']['Row']
export type ModuleComponentInsert = Tables['module_components']['Insert']
export type ModuleComponentUpdate = Tables['module_components']['Update']

export type ModuleDependencyRow = Tables['module_dependencies']['Row']
export type ModuleDependencyInsert = Tables['module_dependencies']['Insert']
export type ModuleDependencyUpdate = Tables['module_dependencies']['Update']

export type ModuleInstanceRow = Tables['module_instances']['Row']
export type ModuleInstanceInsert = Tables['module_instances']['Insert']
export type ModuleInstanceUpdate = Tables['module_instances']['Update'] 