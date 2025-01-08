"use client"

import { useMemo } from "react"
import type { Table } from "@tanstack/react-table"

interface TableA11yConfig {
  tableName: string
  tableDescription?: string
  filterLabels?: Record<string, string>
  columnLabels?: Record<string, string>
  actionLabels?: {
    select?: (rowId: string) => string
    selectAll?: string
    delete?: (count: number) => string
    [key: string]: ((param: any) => string) | string | undefined
  }
}

export function useTableA11y<TData>(
  table: Table<TData>,
  config: TableA11yConfig
) {
  const selectedRows = table.getFilteredSelectedRowModel().rows
  const totalRows = table.getFilteredRowModel().rows.length
  const appliedFilters = table.getState().columnFilters
  const appliedSort = table.getState().sorting

  const a11yLabels = useMemo(() => {
    // Descrição geral da tabela
    const tableDescription = config.tableDescription || 
      `${config.tableName} com ${totalRows} registros${
        selectedRows.length > 0 ? `, ${selectedRows.length} selecionados` : ""
      }`

    // Status dos filtros aplicados
    const filterStatus = appliedFilters.length > 0
      ? `Filtros ativos: ${appliedFilters
          .map(filter => {
            const label = config.filterLabels?.[filter.id] || filter.id
            const values = Array.isArray(filter.value) 
              ? filter.value.join(", ")
              : filter.value
            return `${label}: ${values}`
          })
          .join("; ")}`
      : "Nenhum filtro aplicado"

    // Status da ordenação
    const sortStatus = appliedSort.length > 0
      ? `Ordenado por: ${appliedSort
          .map(sort => {
            const label = config.columnLabels?.[sort.id] || sort.id
            return `${label} ${sort.desc ? "decrescente" : "crescente"}`
          })
          .join(", ")}`
      : "Sem ordenação aplicada"

    // Labels para ações
    const actionLabels = {
      select: (rowId: string) => 
        `Selecionar ${config.columnLabels?.[rowId] || "item"}`,
      selectAll: `Selecionar todos os ${totalRows} itens`,
      delete: (count: number) => 
        `Excluir ${count} ${count === 1 ? "item selecionado" : "itens selecionados"}`,
      ...config.actionLabels
    }

    return {
      tableDescription,
      filterStatus,
      sortStatus,
      actionLabels,
      announcements: {
        loading: "Carregando dados da tabela",
        error: (error: string) => `Erro ao carregar dados: ${error}`,
        empty: "Nenhum resultado encontrado",
        selectionChange: (count: number) => 
          `${count} ${count === 1 ? "item selecionado" : "itens selecionados"}`,
        filterChange: "Resultados filtrados atualizados",
        sortChange: "Ordem dos resultados atualizada",
      }
    }
  }, [
    config,
    totalRows,
    selectedRows.length,
    appliedFilters,
    appliedSort
  ])

  return a11yLabels
} 