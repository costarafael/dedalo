"use client"

import { useState, useMemo, useEffect } from "react"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar"
import { DataTableAdvancedToolbar } from "@/components/data-table/data-table-advanced-toolbar"
import { DataTableFloatingBar } from "@/components/data-table/data-table-floating-bar"
import { useDataTable } from "@/hooks/use-data-table"
import {
  generateColumnsFromTemplate,
  generateSearchableColumns,
  generateFilterableColumns,
} from "@/lib/data-table-template"

interface DynamicDataTableProps {
  template: {
    id: string
    name: string
    fields: {
      id: string
      name: string
      type: string
      required: boolean
      options?: { label: string; value: string }[]
      relation?: {
        table: string
        labelField: string
        valueField: string
        filter?: Record<string, any>
      }
    }[]
  }
  records: {
    id: string
    name: string
    values: {
      id: string
      fieldId: string
      value: any
      relationData?: any
    }[]
  }[]
  pageCount: number
  facetedFilters?: {
    [key: string]: {
      [value: string]: number
    }
  }
  enableAdvancedFilter?: boolean
  enableFloatingBar?: boolean
  onRowsChange?: (rows: any[]) => void
  onPageCountChange?: (count: number) => void
  onLoadingChange?: (loading: boolean) => void
  onDelete?: (selectedRows: any[]) => void
}

export function DynamicDataTable({
  template,
  records,
  pageCount,
  facetedFilters,
  enableAdvancedFilter = false,
  enableFloatingBar = true,
  onRowsChange,
  onPageCountChange,
  onLoadingChange,
  onDelete,
}: DynamicDataTableProps) {
  console.log('DynamicDataTable props:', {
    template,
    records,
    pageCount,
    facetedFilters,
    enableAdvancedFilter,
    enableFloatingBar,
  })

  const [columns] = useState(() => generateColumnsFromTemplate(template))
  const [searchableColumns] = useState(() => generateSearchableColumns(template))
  const [filterableColumns] = useState(() => generateFilterableColumns(template))

  const filterFields = useMemo(() => 
    filterableColumns.map(column => ({
      id: column.id,
      label: column.title,
      type: column.id === "created_at" ? "date" :
            column.id === "archived" ? "number" :
            column.options ? "select" : "text",
      options: column.options
    } as const)), [])

  const { table } = useDataTable({
    data: records,
    columns,
    pageCount,
    filterFields,
    enableAdvancedFilter,
    initialState: {
      sorting: [{ id: "name", desc: false }],
      columnVisibility: {},
    },
    onRowsChange,
    onPageCountChange,
    onLoadingChange,
  })

  useEffect(() => {
    table.setData(records)
  }, [records])

  return (
    <DataTable
      table={table}
      columns={columns}
      filterableColumns={filterableColumns}
      searchableColumns={searchableColumns}
      facetCounts={facetedFilters}
    >
      {enableAdvancedFilter ? (
        <DataTableAdvancedToolbar
          table={table}
          filterFields={filterFields}
          facetCounts={facetedFilters}
        />
      ) : (
        <DataTableToolbar
          table={table}
          facetCounts={facetedFilters}
        />
      )}
      {enableFloatingBar && (
        <DataTableFloatingBar 
          table={table} 
          onDelete={onDelete}
        />
      )}
    </DataTable>
  )
} 