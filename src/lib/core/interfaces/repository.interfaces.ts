import { Database } from '@/types/supabase'

type Tables = Database['public']['Tables']
type EntityRow = Tables['Entity']['Row']
type EntityInsert = Tables['Entity']['Insert']
type OrganizationalUnitRow = Tables['organizational_units']['Row']
type OrganizationalUnitInsert = Tables['organizational_units']['Insert']
type NodeNameRow = Tables['node_names']['Row']
type NodeNameInsert = Tables['node_names']['Insert']
type NodeHierarchyRow = Tables['node_hierarchy_rules']['Row']
type NodeHierarchyInsert = Tables['node_hierarchy_rules']['Insert']
type UnitHierarchyRow = Tables['unit_hierarchies']['Row']
type UnitHierarchyInsert = Tables['unit_hierarchies']['Insert']
type UnitContainerRow = Tables['unit_containers']['Row']
type UnitContainerInsert = Tables['unit_containers']['Insert']
type UnitContainerItemRow = Tables['unit_container_items']['Row']
type UnitContainerItemInsert = Tables['unit_container_items']['Insert']

export type Entity = EntityRow
export type NewEntity = EntityInsert
export type OrganizationalUnit = OrganizationalUnitRow
export type NewOrganizationalUnit = OrganizationalUnitInsert
export type NodeName = NodeNameRow
export type NewNodeName = NodeNameInsert
export type NodeHierarchy = NodeHierarchyRow
export type NewNodeHierarchy = NodeHierarchyInsert
export type UnitHierarchy = UnitHierarchyRow
export type NewUnitHierarchy = UnitHierarchyInsert
export type UnitContainer = UnitContainerRow
export type NewUnitContainer = UnitContainerInsert
export type UnitContainerItem = UnitContainerItemRow
export type NewUnitContainerItem = UnitContainerItemInsert

export enum ContextType {
  ADMIN = 'ADMIN',
  AGENCY = 'AGENCY',
  CLIENT = 'CLIENT',
  PROVIDER = 'PROVIDER'
}

export enum HierarchyValidationType {
  STRICT = 'STRICT',
  FLEXIBLE = 'FLEXIBLE',
  CUSTOM = 'CUSTOM'
}

export enum NodeType {
  ROOT = 'ROOT',
  CATEGORY = 'CATEGORY',
  OPTION = 'OPTION'
}

export enum UnitSelectionMode {
  SINGLE = 'single',
  MULTIPLE = 'multiple'
}

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
  findActiveByClientId(clientId: string): Promise<OrganizationalUnit[]>
  findRootUnit(clientId: string): Promise<OrganizationalUnit | null>
  findActiveRootUnit(clientId: string): Promise<OrganizationalUnit | null>
  validateUnitType(unit: NewOrganizationalUnit): Promise<void>
}

// Interface específica para Node Repository
export interface INodeRepository extends IBaseRepository<NodeName, NewNodeName> {
  findByClientId(clientId: string): Promise<NodeName[]>
  findActiveByClientId(clientId: string): Promise<NodeName[]>
  updateOrder(nodes: Pick<NodeName, 'id' | 'client_id' | 'name' | 'order' | 'is_root'>[]): Promise<void>
}

// Interface específica para Node Hierarchy Repository
export interface INodeHierarchyRepository extends IBaseRepository<NodeHierarchy, NewNodeHierarchy> {
  findByClientId(clientId: string): Promise<NodeHierarchy[]>
  findActiveByClientId(clientId: string): Promise<NodeHierarchy[]>
  findByParentNodeId(parentNodeId: string): Promise<NodeHierarchy[]>
  findByChildNodeId(childNodeId: string): Promise<NodeHierarchy[]>
}

// Interface específica para Unit Hierarchy Repository
export interface IUnitHierarchyRepository extends IBaseRepository<UnitHierarchy, NewUnitHierarchy> {
  findActiveByClientId(clientId: string): Promise<UnitHierarchy[]>
  findWithRelations(): Promise<UnitHierarchy[]>
  findByChildId(childId: string): Promise<UnitHierarchy[]>
  findPrimaryByChildId(childId: string): Promise<UnitHierarchy | null>
  deactivatePrimaryHierarchies(childId: string): Promise<void>
}

// Interface específica para Unit Container Repository
export interface IUnitContainerRepository extends IBaseRepository<UnitContainer, NewUnitContainer> {
  findByClientId(clientId: string): Promise<UnitContainer[]>
  findWithItems(clientId: string): Promise<UnitContainer[]>
  addItem(item: NewUnitContainerItem): Promise<UnitContainerItem>
  removeItem(containerId: string, unitId: string): Promise<void>
}

// Interface específica para Entity Repository
export interface IEntityRepository extends IBaseRepository<Entity> {
  findByType(type: ContextType): Promise<Entity[]>
  findActiveByType(type: ContextType): Promise<Entity[]>
}

// Interface específica para Provider Repository
export interface IProviderRepository extends IBaseRepository<Entity> {
  findActive(): Promise<Entity[]>
  findByClient(clientId: string): Promise<Entity[]>
  findChildren(providerId: string): Promise<Entity[]>
} 