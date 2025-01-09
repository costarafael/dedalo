import { IUnitRepository, IUnitService, OrganizationalUnit, NewOrganizationalUnit } from '../interfaces'

export class UnitService implements IUnitService {
  constructor(private readonly unitRepository: IUnitRepository) {}

  async getAll(): Promise<OrganizationalUnit[]> {
    return this.unitRepository.findAll()
  }

  async getClientUnits(clientId: string): Promise<OrganizationalUnit[]> {
    return this.unitRepository.findByClientId(clientId)
  }

  async getRootUnit(clientId: string): Promise<OrganizationalUnit | null> {
    return this.unitRepository.findRootUnit(clientId)
  }

  async getById(id: string): Promise<OrganizationalUnit | null> {
    return this.unitRepository.findById(id)
  }

  async validateUnitCreation(unit: NewOrganizationalUnit): Promise<void> {
    // Validar se já existe uma unidade ROOT para o cliente
    if (unit.type === 'ROOT') {
      const existingRoot = await this.unitRepository.findRootUnit(unit.client_id)
      if (existingRoot) {
        throw new Error('Já existe uma unidade root para este cliente')
      }
    }

    // Validar nome da unidade
    if (!unit.name || unit.name.trim().length === 0) {
      throw new Error('Nome da unidade é obrigatório')
    }

    // Validar tipo de nó
    if (!unit.node_name_id) {
      throw new Error('Tipo de nó é obrigatório')
    }
  }

  async create(unit: NewOrganizationalUnit): Promise<OrganizationalUnit> {
    // Validações de negócio
    await this.validateUnitCreation(unit)

    return this.unitRepository.create(unit)
  }

  async update(id: string, unit: Partial<OrganizationalUnit>): Promise<OrganizationalUnit> {
    // Validações de negócio
    const existingUnit = await this.unitRepository.findById(id)
    if (!existingUnit) {
      throw new Error('Unidade não encontrada')
    }

    // Não permitir alterar tipo ROOT
    if (existingUnit.type === 'ROOT' && unit.type && unit.type !== 'ROOT') {
      throw new Error('Não é possível alterar o tipo de uma unidade ROOT')
    }

    return this.unitRepository.update(id, unit)
  }

  async delete(id: string): Promise<void> {
    // Validações de negócio
    const existingUnit = await this.unitRepository.findById(id)
    if (!existingUnit) {
      throw new Error('Unidade não encontrada')
    }

    // Não permitir deletar ROOT
    if (existingUnit.type === 'ROOT') {
      throw new Error('Não é possível deletar uma unidade ROOT')
    }

    // TODO: Verificar dependências antes de deletar
    // - Unidades filhas
    // - Registros vinculados
    // - etc

    return this.unitRepository.delete(id)
  }
} 