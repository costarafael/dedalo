"use client"

import * as React from "react"
import type { DataTableAdvancedFilterField } from "@/types"
import { type Table } from "@tanstack/react-table"

import { cn } from "@/lib/utils"
import { DataTableFilterList } from "@/components/data-table/data-table-filter-list"
import { DataTableSortList } from "@/components/data-table/data-table-sort-list"
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options"

interface DataTableAdvancedToolbarProps<TData>
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * A instância da tabela retornada do hook useDataTable com paginação, ordenação, filtros, etc.
   * @type Table<TData>
   */
  table: Table<TData>

  /**
   * Array de configurações de campos para filtros da tabela.
   * @type DataTableAdvancedFilterField<TData>[]
   * @example
   * const filterFields = [
   *   {
   *     id: 'name',
   *     label: 'Nome',
   *     type: 'text',
   *     placeholder: 'Filtrar por nome...'
   *   },
   *   {
   *     id: 'status',
   *     label: 'Status',
   *     type: 'select',
   *     options: [
   *       { label: 'Ativo', value: 'active', count: 10 },
   *       { label: 'Inativo', value: 'inactive', count: 5 }
   *     ]
   *   }
   * ]
   */
  filterFields: DataTableAdvancedFilterField<TData>[]

  /**
   * Tempo de debounce (ms) para atualizações de filtro.
   * @default 300
   */
  debounceMs?: number

  /**
   * Modo shallow mantém os estados de query no cliente, evitando chamadas ao servidor.
   * @default true
   */
  shallow?: boolean
}

export function DataTableAdvancedToolbar<TData>({
  table,
  filterFields = [],
  debounceMs = 300,
  shallow = true,
  children,
  className,
  ...props
}: DataTableAdvancedToolbarProps<TData>) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-between gap-2 overflow-auto p-1",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <DataTableFilterList
          table={table}
          filterFields={filterFields}
          debounceMs={debounceMs}
          shallow={shallow}
        />
        <DataTableSortList
          table={table}
          debounceMs={debounceMs}
          shallow={shallow}
        />
      </div>
      <div className="flex items-center gap-2">
        {children}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}
