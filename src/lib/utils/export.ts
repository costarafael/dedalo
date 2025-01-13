import { type Table } from "@tanstack/react-table"
import * as XLSX from "xlsx"

interface ExportTableOptions {
  /**
   * Nome do arquivo a ser gerado
   * @default "export"
   */
  filename?: string
  
  /**
   * Se true, exporta apenas as linhas selecionadas
   * @default false
   */
  onlySelected?: boolean
  
  /**
   * Colunas a serem excluídas da exportação
   * @default []
   */
  excludeColumns?: string[]

  /**
   * Dados a serem exportados (opcional)
   * Se não fornecido, usa os dados da tabela
   */
  data?: any[]
}

function prepareTableData<TData>(
  table: Table<TData>,
  opts: ExportTableOptions = {}
) {
  const {
    onlySelected = false,
    excludeColumns = [],
    data
  } = opts

  // Pega todas as colunas visíveis exceto as excluídas
  const visibleColumns = table.getAllColumns()
    .filter(column => 
      column.getIsVisible() && 
      !excludeColumns.includes(column.id)
    )

  // Pega as linhas baseado nas opções
  const rows = data ? data : (
    onlySelected 
      ? table.getSelectedRowModel().rows
      : table.getRowModel().rows
  )

  // Cria o cabeçalho
  const headers = visibleColumns.map(column => column.id)

  // Cria as linhas
  const tableRows = rows.map(row => {
    return visibleColumns.map(column => {
      // Se temos dados externos, precisamos acessar diretamente
      const cellValue = data 
        ? row[column.id]
        : row.getValue(column.id)
      
      // Trata valores especiais
      if (cellValue === null || cellValue === undefined) return ""
      if (cellValue instanceof Date) return cellValue.toISOString()
      if (typeof cellValue === "boolean") return cellValue ? "Sim" : "Não"
      
      return cellValue
    })
  })

  return {
    headers,
    rows: tableRows
  }
}

export function exportTableToCSV<TData>(
  table: Table<TData>,
  opts: ExportTableOptions = {}
) {
  const {
    filename = "export",
  } = opts

  const { headers, rows } = prepareTableData(table, opts)

  // Cria as linhas do CSV
  const csvRows = rows.map(row => {
    return row.map(cellValue => {
      // Escapa aspas duplas e strings com vírgulas
      const stringValue = String(cellValue)
      if (stringValue.includes(",") || stringValue.includes('"')) {
        return `"${stringValue.replace(/"/g, '""')}"`
      }
      return stringValue
    }).join(",")
  })

  // Junta tudo em uma string CSV
  const csvContent = [headers.join(","), ...csvRows].join("\n")

  // Cria o blob e faz o download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.setAttribute("href", url)
  link.setAttribute("download", `${filename}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function exportTableToXLSX<TData>(
  table: Table<TData>,
  opts: ExportTableOptions = {}
) {
  const {
    filename = "export",
  } = opts

  const { headers, rows } = prepareTableData(table, opts)

  // Cria uma worksheet
  const ws = XLSX.utils.aoa_to_sheet([headers, ...rows])

  // Cria um workbook e adiciona a worksheet
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1")

  // Gera o arquivo e faz o download
  XLSX.writeFile(wb, `${filename}.xlsx`)
} 