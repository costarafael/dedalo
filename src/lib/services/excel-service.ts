import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import type { NodeName } from '@/lib/api/node-names'
import type { OrganizationalUnit } from '@/lib/api/organizational-units'
import type { UnitHierarchy } from '@/lib/api/unit-hierarchies'

interface ExportData {
  nodes: NodeName[]
  units: OrganizationalUnit[]
  hierarchies: UnitHierarchy[]
}

export function exportToExcel(data: ExportData, clientName: string) {
  const workbook = XLSX.utils.book_new()

  // Planilha de Nodes
  const nodesData = data.nodes.map(node => ({
    ID: node.id,
    Nome: node.name,
    Ordem: node.order,
    'É Root?': node.is_root ? 'Sim' : 'Não',
    'Tipo de Validação': node.validationType,
    'É Obrigatório?': node.is_required ? 'Sim' : 'Não',
    Descrição: node.description || '',
    'Data de Atualização': new Date(node.updated_at).toLocaleString(),
  }))
  const nodesSheet = XLSX.utils.json_to_sheet(nodesData)
  XLSX.utils.book_append_sheet(workbook, nodesSheet, 'Nodes')

  // Planilha de Unidades
  const unitsData = data.units.map(unit => ({
    ID: unit.id,
    Nome: unit.name,
    'ID do Node': unit.node_name_id,
    Tipo: unit.type,
    'Está Ativo?': unit.is_active ? 'Sim' : 'Não',
    'Data de Atualização': new Date(unit.updated_at).toLocaleString(),
  }))
  const unitsSheet = XLSX.utils.json_to_sheet(unitsData)
  XLSX.utils.book_append_sheet(workbook, unitsSheet, 'Unidades')

  // Planilha de Hierarquias
  const hierarchiesData = data.hierarchies.map(hierarchy => ({
    ID: hierarchy.id,
    'ID do Pai': hierarchy.parent_id,
    'ID do Filho': hierarchy.child_id,
    'É Principal?': hierarchy.is_primary ? 'Sim' : 'Não',
    'Caminho da Raiz': hierarchy.path_from_root,
    Profundidade: hierarchy.depth,
    'Está Ativo?': hierarchy.is_active ? 'Sim' : 'Não',
    'Data de Atualização': new Date(hierarchy.updated_at).toLocaleString(),
  }))
  const hierarchiesSheet = XLSX.utils.json_to_sheet(hierarchiesData)
  XLSX.utils.book_append_sheet(workbook, hierarchiesSheet, 'Hierarquias')

  // Exportar arquivo
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
  const data_blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
  saveAs(data_blob, `estrutura_${clientName}_${new Date().toISOString().split('T')[0]}.xlsx`)
}

interface ImportResult {
  nodes: Partial<NodeName>[]
  units: Partial<OrganizationalUnit>[]
  hierarchies: Partial<UnitHierarchy>[]
  errors: string[]
}

export async function importFromExcel(file: File): Promise<ImportResult> {
  const result: ImportResult = {
    nodes: [],
    units: [],
    hierarchies: [],
    errors: []
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer)
        const workbook = XLSX.read(data, { type: 'array' })

        // Importar Nodes
        const nodesSheet = workbook.Sheets['Nodes']
        if (nodesSheet) {
          const nodes = XLSX.utils.sheet_to_json(nodesSheet)
          result.nodes = nodes.map(node => ({
            name: node['Nome'],
            order: node['Ordem'],
            is_root: node['É Root?'] === 'Sim',
            validationType: node['Tipo de Validação'],
            is_required: node['É Obrigatório?'] === 'Sim',
            description: node['Descrição'],
          }))
        } else {
          result.errors.push('Aba "Nodes" não encontrada')
        }

        // Importar Unidades
        const unitsSheet = workbook.Sheets['Unidades']
        if (unitsSheet) {
          const units = XLSX.utils.sheet_to_json(unitsSheet)
          result.units = units.map(unit => ({
            name: unit['Nome'],
            node_name_id: unit['ID do Node'],
            type: unit['Tipo'],
            is_active: unit['Está Ativo?'] === 'Sim',
          }))
        } else {
          result.errors.push('Aba "Unidades" não encontrada')
        }

        // Importar Hierarquias
        const hierarchiesSheet = workbook.Sheets['Hierarquias']
        if (hierarchiesSheet) {
          const hierarchies = XLSX.utils.sheet_to_json(hierarchiesSheet)
          result.hierarchies = hierarchies.map(hierarchy => ({
            parent_id: hierarchy['ID do Pai'],
            child_id: hierarchy['ID do Filho'],
            is_primary: hierarchy['É Principal?'] === 'Sim',
            is_active: hierarchy['Está Ativo?'] === 'Sim',
          }))
        } else {
          result.errors.push('Aba "Hierarquias" não encontrada')
        }

        resolve(result)
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = (error) => reject(error)
    reader.readAsArrayBuffer(file)
  })
} 