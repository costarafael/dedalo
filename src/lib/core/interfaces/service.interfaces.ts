import { Entity, OrganizationalUnit, NewOrganizationalUnit } from './repository.interfaces'

// Interface base para services
export interface IBaseService<T, CreateDTO = any, UpdateDTO = Partial<T>> {
  getAll(): Promise<T[]>
  getById(id: string): Promise<T | null>
  create(data: CreateDTO): Promise<T>
  update(id: string, data: UpdateDTO): Promise<T>
  delete(id: string): Promise<void>
}

// Interface específica para Client Service
export interface IClientService extends IBaseService<Entity> {
  getActiveClients(): Promise<Entity[]>
}

// Interface específica para Organizational Unit Service
export interface IUnitService extends IBaseService<OrganizationalUnit, NewOrganizationalUnit> {
  getAll(): Promise<OrganizationalUnit[]>
  getById(id: string): Promise<OrganizationalUnit | null>
  getClientUnits(clientId: string): Promise<OrganizationalUnit[]>
  getActiveClientUnits(clientId: string): Promise<OrganizationalUnit[]>
  getRootUnit(clientId: string): Promise<OrganizationalUnit | null>
  getActiveRootUnit(clientId: string): Promise<OrganizationalUnit | null>
  validateUnitType(unit: NewOrganizationalUnit): Promise<void>
  validateUnitCreation(unit: NewOrganizationalUnit): Promise<void>
  create(unit: NewOrganizationalUnit): Promise<OrganizationalUnit>
  createWithHierarchy(unit: NewOrganizationalUnit, parentIds: string[]): Promise<OrganizationalUnit>
  update(id: string, unit: Partial<OrganizationalUnit>): Promise<OrganizationalUnit>
  delete(id: string): Promise<void>
}

// Interface específica para Node Service
export interface INodeService extends IBaseService<NodeName, NewNodeName> {
  getAll(): Promise<NodeName[]>
  getById(id: string): Promise<NodeName | null>
  getClientNodes(clientId: string): Promise<NodeName[]>
  getActiveClientNodes(clientId: string): Promise<NodeName[]>
  create(node: NewNodeName): Promise<NodeName>
  update(id: string, node: Partial<NodeName>): Promise<NodeName>
  updateNodesOrder(nodes: Pick<NodeName, 'id' | 'client_id' | 'name' | 'order' | 'is_root'>[]): Promise<void>
  delete(id: string): Promise<void>
}

// Interface específica para Container Service
export interface IContainerService extends IBaseService<OrganizationalUnit> {
  getClientContainers(clientId: string): Promise<OrganizationalUnit[]>
  validateContainerAssignment(containerId: string, unitId: string): Promise<void>
}

// Interface específica para Entity Service
export interface IEntityService extends IBaseService<Entity> {
  getByType(type: ContextType): Promise<Entity[]>
  getActiveByType(type: ContextType): Promise<Entity[]>
}

// Interface específica para Provider Service
export interface IProviderService extends IBaseService<Entity> {
  getAll(): Promise<Entity[]>
  getActive(): Promise<Entity[]>
  getById(id: string): Promise<Entity | null>
  getByClient(clientId: string): Promise<Entity[]>
  getChildren(providerId: string): Promise<Entity[]>
  create(data: Partial<Entity> & { client_id: string; parent_provider_id?: string }): Promise<Entity>
  update(id: string, data: Partial<Entity>): Promise<Entity>
  delete(id: string): Promise<void>
}

// Interface específica para Node Hierarchy Service
export interface INodeHierarchyService extends IBaseService<NodeHierarchy, NewNodeHierarchy> {
  getClientHierarchies(clientId: string): Promise<NodeHierarchy[]>
  getActiveClientHierarchies(clientId: string): Promise<NodeHierarchy[]>
  getParentNodeHierarchies(parentNodeId: string): Promise<NodeHierarchy[]>
  getChildNodeHierarchies(childNodeId: string): Promise<NodeHierarchy[]>
  validateHierarchyCreation(hierarchy: NewNodeHierarchy): Promise<void>
  validateHierarchyNodes(parentNodeId: string, childNodeId: string): Promise<void>
}

// Interface específica para Unit Hierarchy Service
export interface IUnitHierarchyService extends IBaseService<UnitHierarchy, NewUnitHierarchy> {
  getClientHierarchies(clientId: string): Promise<UnitHierarchy[]>
  getActiveClientHierarchies(clientId: string): Promise<UnitHierarchy[]>
  getByChildId(childId: string): Promise<UnitHierarchy[]>
  getPrimaryByChildId(childId: string): Promise<UnitHierarchy | null>
  validateHierarchyCreation(hierarchy: NewUnitHierarchy): Promise<void>
  validatePrimaryHierarchy(childId: string): Promise<void>
  softDelete(id: string): Promise<void>
}

// Interface específica para Unit Container Service
export interface IUnitContainerService extends IBaseService<UnitContainer, NewUnitContainer> {
  getClientContainers(clientId: string): Promise<UnitContainer[]>
  getClientContainersWithItems(clientId: string): Promise<UnitContainer[]>
  createWithItems(container: NewUnitContainer, unitIds: string[]): Promise<UnitContainer>
  addUnit(containerId: string, unitId: string): Promise<UnitContainerItem>
  removeUnit(containerId: string, unitId: string): Promise<void>
  softDelete(id: string): Promise<void>
}

// Interface específica para Module Service
export interface IModuleService extends IBaseService<Module, NewModule> {
  getActive(): Promise<Module[]>
  getBySlug(slug: string): Promise<Module | null>
  getLibraries(): Promise<Module[]>
  validateModuleCreation(module: NewModule): Promise<void>
  softDelete(id: string): Promise<void>
} 