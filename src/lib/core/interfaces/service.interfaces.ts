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
  getClientUnits(clientId: string): Promise<OrganizationalUnit[]>
  getRootUnit(clientId: string): Promise<OrganizationalUnit | null>
  validateUnitCreation(unit: NewOrganizationalUnit): Promise<void>
}

// Interface específica para Node Service
export interface INodeService extends IBaseService<OrganizationalUnit> {
  getNodesByType(type: string): Promise<OrganizationalUnit[]>
  validateNodeHierarchy(parentId: string, childId: string): Promise<void>
}

// Interface específica para Container Service
export interface IContainerService extends IBaseService<OrganizationalUnit> {
  getClientContainers(clientId: string): Promise<OrganizationalUnit[]>
  validateContainerAssignment(containerId: string, unitId: string): Promise<void>
} 