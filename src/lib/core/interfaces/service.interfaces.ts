import { Client, Entity } from "./repository.interfaces"

export interface IClientService {
  validateClient(data: Partial<Client>): boolean
  validateClientData(data: any): boolean
} 