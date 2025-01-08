"use client"

import { columns, searchableColumns, filterableColumns } from "@/app/global/clients/columns"
import { useDataTable } from "@/hooks/use-data-table"
import { useCallback, useMemo, useState } from "react"
import type { Client } from "@/app/global/clients/columns"
import { useFeatureFlags } from "@/components/providers"
import { DataTableAdvancedToolbar } from "@/components/data-table/data-table-advanced-toolbar"
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar"
import { TableFeatureSelector } from "@/components/data-table/table-feature-selector"
import { DataView } from "@/components/data-view/data-view"

export default function HomePage() {
  const [data, setData] = useState<Client[]>([])
  const [pageCount, setPageCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { featureFlags } = useFeatureFlags()

  const enableAdvancedTable = featureFlags.includes("advancedTable")
  const enableFloatingBar = featureFlags.includes("floatingBar")

  // Dados do módulo e template (exemplo, substituir pelos dados reais)
  const module = {
    slug: "clients"
  }
  const template = {
    slug: "default"
  }

  console.log('Dados do módulo e template:', { module, template })

  // Memoize callbacks
  const handleRowsChange = useCallback((newData: Client[]) => {
    setData(newData)
  }, [])

  const handlePageCountChange = useCallback((count: number) => {
    setPageCount(count)
  }, [])

  const handleLoadingChange = useCallback((loading: boolean) => {
    setIsLoading(loading)
  }, [])

  const handleError = useCallback((err: string) => {
    setError(err)
  }, [])

  // Memoize table config
  const tableConfig = useMemo(() => ({
    data,
    columns,
    pageCount,
    searchableColumns,
    filterableColumns,
    onRowsChange: handleRowsChange,
    onPageCountChange: handlePageCountChange,
    onLoadingChange: handleLoadingChange,
    onError: handleError,
    enableAdvancedFilter: enableAdvancedTable
  }), [
    data, 
    pageCount, 
    handleRowsChange, 
    handlePageCountChange, 
    handleLoadingChange, 
    handleError, 
    enableAdvancedTable
  ])

  const { table, facetCounts } = useDataTable<Client>({
    ...tableConfig,
    module,
    template
  })

  // Memoize filter fields
  const filterFields = useMemo(() => 
    filterableColumns.map(column => ({
      id: column.id,
      label: column.title,
      type: column.id === "created_at" ? "date" :
            column.id === "archived" ? "number" :
            column.options ? "select" : "text",
      options: column.options
    } as const)), [])

  // Toolbar component
  const toolbar = enableAdvancedTable ? (
    <DataTableAdvancedToolbar
      table={table}
      filterFields={filterFields}
    />
  ) : (
    <DataTableToolbar
      table={table}
      filterFields={filterableColumns}
      searchableColumns={searchableColumns}
      facetCounts={facetCounts}
    />
  )

  return (
    <main className="p-8">
      <div className="mb-4">
        <TableFeatureSelector />
      </div>
      <DataView<Client>
        data={data}
        columns={columns}
        table={table}
        toolbar={toolbar}
        facetCounts={facetCounts}
        isLoading={isLoading}
        error={error}
        // Customização dos cards
        cardClassName="hover:bg-accent transition-colors"
        renderHeader={(item) => (
          <div className="p-6">
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-sm text-muted-foreground">{item.email}</p>
          </div>
        )}
      />
    </main>
  )
}
