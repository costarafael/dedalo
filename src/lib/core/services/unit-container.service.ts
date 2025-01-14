import { UnitContainer, UnitContainerItem } from "../interfaces/repository.interfaces"
import { UnitContainerRepository } from "../repositories/unit-container.repository"

export class UnitContainerService {
  constructor(private readonly repository: UnitContainerRepository = new UnitContainerRepository()) {}

  async getContainers(clientId: string): Promise<UnitContainer[]> {
    return this.repository.findByClientId(clientId)
  }

  async getContainer(id: string): Promise<UnitContainer | null> {
    return this.repository.findById(id)
  }

  async createContainer(data: { client_id: string; name: string; node_name_id: string }): Promise<UnitContainer> {
    return this.repository.create(data)
  }

  async updateContainer(id: string, data: Partial<UnitContainer>): Promise<UnitContainer> {
    return this.repository.update(id, data)
  }

  async deleteContainer(id: string): Promise<void> {
    return this.repository.delete(id)
  }

  async addUnit(containerId: string, unitId: string): Promise<UnitContainerItem> {
    return this.repository.addUnit(containerId, unitId)
  }

  async removeUnit(containerId: string, unitId: string): Promise<void> {
    return this.repository.removeUnit(containerId, unitId)
  }

  async getUnits(containerId: string) {
    return this.repository.getUnits(containerId)
  }
}

// Singleton instance
export const unitContainerService = new UnitContainerService() 