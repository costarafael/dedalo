import { UnitContainer, NewUnitContainer, UnitContainerItem, NewUnitContainerItem } from '@/types/unit-container'
import { IUnitContainerService } from '../interfaces/service.interfaces'
import { IUnitContainerRepository } from '../interfaces/repository.interfaces'

export class UnitContainerService implements IUnitContainerService {
  constructor(private readonly repository: IUnitContainerRepository) {}

  async getAll(): Promise<UnitContainer[]> {
    return this.repository.findAll()
  }

  async getById(id: string): Promise<UnitContainer | null> {
    return this.repository.findById(id)
  }

  async getClientContainers(clientId: string): Promise<UnitContainer[]> {
    return this.repository.findByClientId(clientId)
  }

  async getClientContainersWithItems(clientId: string): Promise<UnitContainer[]> {
    return this.repository.findWithItems(clientId)
  }

  async create(data: NewUnitContainer): Promise<UnitContainer> {
    return this.repository.create(data)
  }

  async createWithItems(container: NewUnitContainer, unitIds: string[]): Promise<UnitContainer> {
    // Criar o container
    const createdContainer = await this.repository.create({
      ...container,
      is_active: true
    })

    // Criar os itens do container
    await Promise.all(unitIds.map(unitId => 
      this.repository.addItem({
        container_id: createdContainer.id,
        unit_id: unitId,
        is_active: true
      })
    ))

    return createdContainer
  }

  async update(id: string, data: Partial<UnitContainer>): Promise<UnitContainer> {
    const existing = await this.repository.findById(id)
    if (!existing) {
      throw new Error('Container não encontrado')
    }

    return this.repository.update(id, data)
  }

  async delete(id: string): Promise<void> {
    const existing = await this.repository.findById(id)
    if (!existing) {
      throw new Error('Container não encontrado')
    }

    return this.repository.delete(id)
  }

  async softDelete(id: string): Promise<void> {
    const existing = await this.repository.findById(id)
    if (!existing) {
      throw new Error('Container não encontrado')
    }

    return this.repository.softDelete(id)
  }

  async addUnit(containerId: string, unitId: string): Promise<UnitContainerItem> {
    const container = await this.repository.findById(containerId)
    if (!container) {
      throw new Error('Container não encontrado')
    }

    return this.repository.addItem({
      container_id: containerId,
      unit_id: unitId,
      is_active: true
    })
  }

  async removeUnit(containerId: string, unitId: string): Promise<void> {
    const container = await this.repository.findById(containerId)
    if (!container) {
      throw new Error('Container não encontrado')
    }

    return this.repository.removeItem(containerId, unitId)
  }
} 