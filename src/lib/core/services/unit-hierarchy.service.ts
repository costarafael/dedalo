import { UnitHierarchy, NewUnitHierarchy } from '@/types/unit-hierarchy'
import { IUnitHierarchyService } from '../interfaces/service.interfaces'
import { IUnitHierarchyRepository } from '../interfaces/repository.interfaces'

export class UnitHierarchyService implements IUnitHierarchyService {
  constructor(private readonly repository: IUnitHierarchyRepository) {}

  async getAll(): Promise<UnitHierarchy[]> {
    return this.repository.findAll()
  }

  async getById(id: string): Promise<UnitHierarchy | null> {
    return this.repository.findById(id)
  }

  async getClientHierarchies(clientId: string): Promise<UnitHierarchy[]> {
    return this.repository.findActiveByClientId(clientId)
  }

  async getActiveClientHierarchies(clientId: string): Promise<UnitHierarchy[]> {
    return this.repository.findWithRelations()
  }

  async getByChildId(childId: string): Promise<UnitHierarchy[]> {
    return this.repository.findByChildId(childId)
  }

  async getPrimaryByChildId(childId: string): Promise<UnitHierarchy | null> {
    return this.repository.findPrimaryByChildId(childId)
  }

  async create(data: NewUnitHierarchy): Promise<UnitHierarchy> {
    await this.validateHierarchyCreation(data)

    // Se for uma hierarquia primária, desativar outras hierarquias primárias
    if (data.is_primary) {
      await this.validatePrimaryHierarchy(data.child_id)
      await this.repository.deactivatePrimaryHierarchies(data.child_id)
    }

    // Buscar o path_from_root do pai
    const parentHierarchy = await this.repository.findPrimaryByChildId(data.parent_id)

    // Criar a nova hierarquia
    const hierarchyData = {
      ...data,
      path_from_root: parentHierarchy 
        ? `${parentHierarchy.path_from_root}/${data.parent_id}/${data.child_id}`
        : `/${data.parent_id}/${data.child_id}`,
      depth: parentHierarchy ? parentHierarchy.depth + 1 : 1,
      is_active: true,
    }

    return this.repository.create(hierarchyData)
  }

  async update(id: string, data: Partial<UnitHierarchy>): Promise<UnitHierarchy> {
    const existing = await this.repository.findById(id)
    if (!existing) {
      throw new Error('Hierarquia não encontrada')
    }

    // Se estiver alterando para hierarquia primária
    if (data.is_primary && !existing.is_primary) {
      await this.validatePrimaryHierarchy(existing.child_id)
      await this.repository.deactivatePrimaryHierarchies(existing.child_id)
    }

    return this.repository.update(id, data)
  }

  async delete(id: string): Promise<void> {
    const existing = await this.repository.findById(id)
    if (!existing) {
      throw new Error('Hierarquia não encontrada')
    }

    return this.repository.delete(id)
  }

  async softDelete(id: string): Promise<void> {
    const existing = await this.repository.findById(id)
    if (!existing) {
      throw new Error('Hierarquia não encontrada')
    }

    return this.repository.softDelete(id)
  }

  async validateHierarchyCreation(hierarchy: NewUnitHierarchy): Promise<void> {
    if (!hierarchy.parent_id || !hierarchy.child_id) {
      throw new Error('Unidades pai e filha são obrigatórias')
    }

    // Verificar se já existe uma hierarquia com as mesmas unidades
    const existingHierarchies = await this.repository.findByChildId(hierarchy.child_id)
    const hasExistingHierarchy = existingHierarchies.some(h => h.parent_id === hierarchy.parent_id)
    if (hasExistingHierarchy) {
      throw new Error('Já existe uma hierarquia com estas unidades')
    }

    // Verificar se a unidade pai não é a mesma que a unidade filha
    if (hierarchy.parent_id === hierarchy.child_id) {
      throw new Error('Uma unidade não pode ser pai dela mesma')
    }

    // Verificar se não criaria um ciclo na hierarquia
    const childHierarchies = await this.repository.findByChildId(hierarchy.parent_id)
    const hasCircularDependency = childHierarchies.some(h => h.parent_id === hierarchy.child_id)
    if (hasCircularDependency) {
      throw new Error('A hierarquia criaria uma dependência circular')
    }
  }

  async validatePrimaryHierarchy(childId: string): Promise<void> {
    // Verificar se já existe uma hierarquia primária para a unidade
    const existingPrimary = await this.repository.findPrimaryByChildId(childId)
    if (existingPrimary) {
      throw new Error('Já existe uma hierarquia primária para esta unidade')
    }
  }
} 