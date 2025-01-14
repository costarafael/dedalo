import { NodeName, OrganizationalUnit, UnitHierarchy } from "../interfaces/repository.interfaces"

export async function exportToExcel(
  clientName: string,
  nodes: NodeName[],
  units: OrganizationalUnit[],
  hierarchies: UnitHierarchy[]
) {
  // TODO: Implementar exportação para Excel
  console.log("Exportando para Excel:", { clientName, nodes, units, hierarchies })
}

export async function importFromExcel(file: File) {
  // TODO: Implementar importação do Excel
  console.log("Importando do Excel:", file)
  return {
    nodes: [],
    units: [],
    hierarchies: []
  }
} 