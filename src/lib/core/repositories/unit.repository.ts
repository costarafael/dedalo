import { 
  IUnitRepository, 
  OrganizationalUnit, 
  NewOrganizationalUnit
} from '../interfaces'
import { unitApi } from '@/lib/http/services/unit.service'

export class UnitRepository implements IUnitRepository {
  async findAll(): Promise<OrganizationalUnit[]> {
    const { data } = await unitApi.getAll()
    return data
  }

  async findByClientId(clientId: string): Promise<OrganizationalUnit[]> {
    const { data } = await unitApi.getByClient(clientId)
    return data
  }

  async findRootUnit(clientId: string): Promise<OrganizationalUnit | null> {
    const { data } = await unitApi.getRootUnit(clientId)
    return data
  }

  async findById(id: string): Promise<OrganizationalUnit | null> {
    const { data } = await unitApi.getById(id)
    return data
  }

  async create(data: NewOrganizationalUnit): Promise<OrganizationalUnit> {
    const { data: unit } = await unitApi.create(data)
    return unit
  }

  async update(id: string, data: Partial<OrganizationalUnit>): Promise<OrganizationalUnit> {
    const { data: unit } = await unitApi.update(id, data)
    return unit
  }

  async delete(id: string): Promise<void> {
    await unitApi.delete(id)
  }
} 