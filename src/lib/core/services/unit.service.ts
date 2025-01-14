import { OrganizationalUnitRow, OrganizationalUnitInsert } from "../interfaces/repository.interfaces"
import { UnitRepository } from "../repositories/unit.repository"

export class UnitService {
  private repository: UnitRepository

  constructor(repository?: UnitRepository) {
    this.repository = repository || new UnitRepository()
  }

  async getUnits(clientId: string): Promise<OrganizationalUnitRow[]> {
    return this.repository.findByClientId(clientId)
  }

  async getRootUnit(clientId: string): Promise<OrganizationalUnitRow | null> {
    return this.repository.findRootUnit(clientId)
  }

  async createUnit(data: { client_id: string; name: string; node_name_id: string }): Promise<OrganizationalUnitRow> {
    return this.repository.create(data)
  }

  async updateUnit(id: string, data: Partial<OrganizationalUnitRow>): Promise<OrganizationalUnitRow> {
    return this.repository.update(id, data)
  }

  async deleteUnit(id: string): Promise<void> {
    return this.repository.delete(id)
  }
} 