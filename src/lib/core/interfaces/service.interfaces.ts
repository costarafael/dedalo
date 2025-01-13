import { Entity, Client, OrganizationalUnit, NodeName } from './repository.interfaces'

export interface IClientService {
  validateClient(data: Partial<Client>): boolean
  validateClientData(data: any): boolean
  transformClientData(data: any): Client
  transformToEntity(client: Client): Entity
  transformFromEntity(entity: Entity): Client
}

export interface IUnitService {
  validateUnit(data: Partial<OrganizationalUnit>): boolean
  validateUnitData(data: any): boolean
  transformUnitData(data: any): OrganizationalUnit
  validateNodeAssignment(nodeId: string, clientId: string): Promise<boolean>
  validateHierarchy(parentId: string, childId: string): Promise<boolean>
}

export interface INodeService {
  validateNode(data: Partial<NodeName>): boolean
  validateNodeData(data: any): boolean
  transformNodeData(data: any): NodeName
  validateNodeName(name: string, clientId: string, excludeId?: string): Promise<boolean>
  validateHierarchy(parentId: string, childId: string): Promise<boolean>
} 