import { 
  IUnitContainerRepository, 
  UnitContainer, 
  NewUnitContainer,
  UnitContainerItem
} from '../interfaces'
import { unitContainerApi } from '@/lib/http/services/unit-container.service'

export class UnitContainerRepository implements IUnitContainerRepository {
  async findAll(): Promise<UnitContainer[]> {
    const { data } = await unitContainerApi.getAll()
    return data
  }

  async findById(id: string): Promise<UnitContainer | null> {
    const { data } = await unitContainerApi.getById(id)
    return data
  }

  async findByClientId(clientId: string): Promise<UnitContainer[]> {
    const { data } = await unitContainerApi.getByClient(clientId)
    return data
  }

  async create(data: NewUnitContainer): Promise<UnitContainer> {
    const { data: container } = await unitContainerApi.create(data)
    return container
  }

  async update(id: string, data: Partial<UnitContainer>): Promise<UnitContainer> {
    const { data: container } = await unitContainerApi.update(id, data)
    return container
  }

  async delete(id: string): Promise<void> {
    await unitContainerApi.delete(id)
  }

  async getUnits(containerId: string): Promise<UnitContainerItem[]> {
    const { data } = await unitContainerApi.getUnits(containerId)
    return data
  }

  async addUnit(containerId: string, unitId: string): Promise<UnitContainerItem> {
    const { data } = await unitContainerApi.addUnit(containerId, unitId)
    return data
  }

  async removeUnit(containerId: string, unitId: string): Promise<void> {
    await unitContainerApi.removeUnit(containerId, unitId)
  }
} 