import { getBrowserClient } from '@/lib/database/supabase'
import { IUnitRepository, IUnitService, OrganizationalUnit, NewOrganizationalUnit } from '../interfaces'

export class UnitService implements IUnitService {
  constructor(private readonly unitRepository: IUnitRepository) {}

  async getAll(): Promise<OrganizationalUnit[]> {
    return this.unitRepository.findAll()
  }

  async getById(id: string): Promise<OrganizationalUnit | null> {
    return this.unitRepository.findById(id)
  }

  async getClientUnits(clientId: string): Promise<OrganizationalUnit[]> {
    return this.unitRepository.findByClientId(clientId)
  }

  async getActiveClientUnits(clientId: string): Promise<OrganizationalUnit[]> {
    return this.unitRepository.findActiveByClientId(clientId)
  }

  async getRootUnit(clientId: string): Promise<OrganizationalUnit | null> {
    return this.unitRepository.findRootUnit(clientId)
  }

  async getActiveRootUnit(clientId: string): Promise<OrganizationalUnit | null> {
    return this.unitRepository.findActiveRootUnit(clientId)
  }

  async validateUnitType(unit: NewOrganizationalUnit): Promise<void> {
    await this.unitRepository.validateUnitType(unit)
  }

  async validateUnitCreation(unit: NewOrganizationalUnit): Promise<void> {
    // Validações básicas
    if (!unit.name) {
      throw new Error('Nome da unidade é obrigatório')
    }
    if (!unit.client_id) {
      throw new Error('Cliente é obrigatório')
    }
    if (!unit.node_name_id) {
      throw new Error('Tipo de nó é obrigatório')
    }
    if (!unit.type) {
      throw new Error('Tipo de unidade é obrigatório')
    }

    // Se for ROOT, validar se já existe uma unidade root para este cliente
    if (unit.type === 'ROOT') {
      const existingRoot = await this.unitRepository.findRootUnit(unit.client_id)
      if (existingRoot) {
        throw new Error('Já existe uma unidade root para este cliente')
      }
    }

    // Validar se o node_name existe e está ativo
    const { data: nodeNameData, error: nodeNameError } = await getBrowserClient()
      .from('node_names')
      .select('*')
      .eq('id', unit.node_name_id)
      .eq('client_id', unit.client_id)
      .is('deleted_at', null)
      .single()

    if (nodeNameError || !nodeNameData) {
      throw new Error('Tipo de nó inválido ou inativo')
    }

    // Validar se o node é root
    if (nodeNameData.is_root && unit.type !== 'ROOT') {
      throw new Error('Node root só pode ser usado para unidades root')
    }
    if (!nodeNameData.is_root && unit.type === 'ROOT') {
      throw new Error('Unidades root só podem usar nodes root')
    }

    // Validação específica do tipo
    await this.validateUnitType(unit)
  }

  async create(unit: NewOrganizationalUnit): Promise<OrganizationalUnit> {
    // Validações de negócio
    await this.validateUnitCreation(unit)

    // Definir o full_path
    let full_path: string | null = null
    if (unit.type === 'ROOT') {
      full_path = `/${unit.name}`
    } else {
      const parent = await this.getById(unit.parent_id!)
      if (!parent) {
        throw new Error('Unidade pai não encontrada')
      }
      full_path = parent.full_path ? `${parent.full_path}/${unit.name}` : `/${unit.name}`
    }

    return this.unitRepository.create({
      ...unit,
      full_path
    })
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

  async createWithHierarchy(unit: NewOrganizationalUnit, parentIds: string[]): Promise<OrganizationalUnit> {
    // Validações de negócio
    await this.validateUnitCreation(unit)

    const supabase = getBrowserClient()

    // Remove o parent_id antes de criar a unidade
    const { parent_id, ...unitData } = unit

    console.log('Creating unit:', unitData)

    // Inicia a transação
    const { data: createdUnit, error: unitError } = await supabase
      .from('organizational_units')
      .insert({
        ...unitData,
        id: crypto.randomUUID(),
        order_index: 0,
        is_active: true,
        deleted_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (unitError) {
      console.error('Error creating unit:', unitError)
      throw unitError
    }
    if (!createdUnit) throw new Error('Erro ao criar unidade')

    // Se não houver unidades pai e não for ROOT, usa a unidade root como pai
    if (parentIds.length === 0 && unit.type !== 'ROOT') {
      const rootUnit = await this.findRootUnit(unit.client_id)
      if (rootUnit) {
        parentIds = [rootUnit.id]
      }
    }

    console.log('Creating hierarchies with parents:', parentIds)

    // Cria as hierarquias
    if (parentIds.length > 0) {
      const hierarchies = parentIds.map((parentId) => ({
        id: crypto.randomUUID(),
        parent_id: parentId,
        child_id: createdUnit.id,
        is_active: true,
        is_primary: true, // A primeira hierarquia é sempre primária
        depth: 0, // Será calculado pelo banco
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null
      }))

      const { error: hierarchyError } = await supabase
        .from('unit_hierarchies')
        .insert(hierarchies)

      if (hierarchyError) {
        console.error('Error creating hierarchies:', hierarchyError)
        throw hierarchyError
      }
    }

    return createdUnit
  }

  async findById(id: string): Promise<OrganizationalUnit | null> {
    return this.unitRepository.findById(id)
  }

  async findRootUnit(clientId: string): Promise<OrganizationalUnit | null> {
    return this.unitRepository.findRootUnit(clientId)
  }

  async findByClientId(clientId: string): Promise<OrganizationalUnit[]> {
    return this.unitRepository.findByClientId(clientId)
  }
} 