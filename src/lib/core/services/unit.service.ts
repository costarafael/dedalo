import { IUnitService } from '../interfaces/service.interfaces'
import { IUnitRepository, INodeRepository } from '../interfaces/repository.interfaces'
import type { OrganizationalUnit } from '../interfaces/repository.interfaces'

export class UnitService implements IUnitService {
  constructor(
    private unitRepository: IUnitRepository,
    private nodeRepository: INodeRepository
  ) {}

  validateUnit(data: Partial<OrganizationalUnit>): boolean {
    if (!data) return false
    
    // Validações básicas
    if (data.name && data.name.length < 3) return false
    if (!data.client_id) return false
    if (!data.node_name_id) return false
    
    return true
  }

  validateUnitData(data: any): boolean {
    if (!data) return false
    
    // Validar estrutura básica
    const requiredFields = ['name', 'client_id', 'node_name_id']
    return requiredFields.every(field => field in data)
  }

  transformUnitData(data: any): OrganizationalUnit {
    if (!this.validateUnitData(data)) {
      throw new Error('Invalid unit data structure')
    }

    return {
      id: data.id,
      name: data.name,
      client_id: data.client_id,
      node_name_id: data.node_name_id,
      metadata: data.metadata || {},
      created_at: data.created_at || new Date().toISOString(),
      updated_at: data.updated_at || new Date().toISOString(),
      deleted_at: data.deleted_at || null,
      is_active: data.is_active ?? true
    }
  }

  async validateNodeAssignment(nodeId: string, clientId: string): Promise<boolean> {
    // Verificar se o nó existe e pertence ao cliente
    const node = await this.nodeRepository.findById(nodeId)
    if (!node) return false
    if (node.client_id !== clientId) return false
    
    return true
  }

  async validateHierarchy(parentId: string, childId: string): Promise<boolean> {
    // Verificar se as unidades existem
    const [parent, child] = await Promise.all([
      this.unitRepository.findById(parentId),
      this.unitRepository.findById(childId)
    ])

    if (!parent || !child) return false
    
    // Verificar se são do mesmo cliente
    if (parent.client_id !== child.client_id) return false
    
    // Verificar se não é a mesma unidade
    if (parentId === childId) return false
    
    // TODO: Adicionar validações específicas de hierarquia
    // - Verificar ciclos
    // - Verificar regras de nós
    // - etc
    
    return true
  }
} 