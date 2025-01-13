import { 
  IUnitHierarchyRepository, 
  UnitHierarchy, 
  NewUnitHierarchy
} from '../interfaces'
import { unitHierarchyApi } from '@/lib/http/services/unit-hierarchy.service'

export class UnitHierarchyRepository implements IUnitHierarchyRepository {
  async findAll(): Promise<UnitHierarchy[]> {
    const { data } = await unitHierarchyApi.getAll()
    return data
  }

  async findById(id: string): Promise<UnitHierarchy | null> {
    const { data } = await unitHierarchyApi.getById(id)
    return data
  }

  async findByParentId(parentId: string): Promise<UnitHierarchy[]> {
    const { data } = await unitHierarchyApi.getByParentId(parentId)
    return data
  }

  async findByChildId(childId: string): Promise<UnitHierarchy[]> {
    const { data } = await unitHierarchyApi.getByChildId(childId)
    return data
  }

  async findPrimaryPath(unitId: string): Promise<UnitHierarchy[]> {
    const { data } = await unitHierarchyApi.getPrimaryPath(unitId)
    return data
  }

  async create(data: NewUnitHierarchy): Promise<UnitHierarchy> {
    const { data: hierarchy } = await unitHierarchyApi.create(data)
    return hierarchy
  }

  async update(id: string, data: Partial<UnitHierarchy>): Promise<UnitHierarchy> {
    const { data: hierarchy } = await unitHierarchyApi.update(id, data)
    return hierarchy
  }

  async delete(id: string): Promise<void> {
    await unitHierarchyApi.delete(id)
  }

  async validateHierarchy(parentId: string, childId: string): Promise<boolean> {
    const { data } = await unitHierarchyApi.validateHierarchy(parentId, childId)
    return data
  }
} 