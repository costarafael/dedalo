"use client"

import * as React from "react"
import type { Table } from "@tanstack/react-table"
import type {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from "@/types"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options"
import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { exportTableToCSV, exportTableToXLSX } from "@/lib/export"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  filterFields: DataTableFilterableColumn<TData>[]
  searchableColumns?: DataTableSearchableColumn<TData>[]
  facetCounts?: Record<string, Record<string, number>>
  className?: string
  viewToggle?: React.ReactNode
}

export function DataTableToolbar<TData>({
  table,
  filterFields,
  searchableColumns = [],
  facetCounts,
  className,
  viewToggle
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  const handleExport = async (format: "csv" | "xlsx") => {
    try {
      // Buscar todos os dados
      const params = new URLSearchParams()
      params.set("per_page", "999999") // Buscar todos os registros
      params.set("include_facets", "false")

      // Manter os filtros atuais
      const columnFilters = table.getState().columnFilters
      columnFilters.forEach(filter => {
        if (Array.isArray(filter.value)) {
          params.set(filter.id, filter.value.join(','))
        } else {
          params.set(filter.id, String(filter.value))
        }
      })

      // Manter a ordenação atual
      const sorting = table.getState().sorting
      if (sorting.length > 0) {
        params.set("sort", sorting[0].id)
        params.set("order", sorting[0].desc ? "desc" : "asc")
      }

      const response = await fetch(`/api/clients?${params.toString()}`)
      if (!response.ok) throw new Error("Erro ao exportar dados")
      
      const json = await response.json()
      
      if (json.data && Array.isArray(json.data)) {
        const exportOptions = {
          filename: "clientes",
          excludeColumns: ["select", "actions"],
          data: json.data
        }

        if (format === "csv") {
          exportTableToCSV(table, exportOptions)
        } else {
          exportTableToXLSX(table, exportOptions)
        }
      }
    } catch (error) {
      console.error("Erro ao exportar:", error)
    }
  }

  return (
    <ScrollArea className={className}>
      <div className="flex flex-col gap-4 py-4">
        {/* Primeira Linha: Controles de Visualização */}
        <div className="flex items-center gap-4">
          {/* Grupo de Botões de Visualização */}
          <div className="flex items-center">
            <div className="flex items-center gap-0.5">
              {viewToggle}
            </div>
            <div className="ml-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <DataTableViewOptions table={table} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>Columns</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* Botão de Exportação */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                      >
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Exportar</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleExport("csv")}>
                        Exportar CSV
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleExport("xlsx")}>
                        Exportar Excel
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TooltipTrigger>
              <TooltipContent>Export</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Segunda Linha: Filtros */}
        <div className="flex flex-wrap items-start gap-4">
          {/* Filtros de Busca Textual */}
          {searchableColumns.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {searchableColumns.map((column) => (
                <Input
                  key={column.id.toString()}
                  placeholder={`Filtrar ${column.title.toLowerCase()}...`}
                  value={(table.getColumn(column.id.toString())?.getFilterValue() as string) ?? ""}
                  onChange={(event) =>
                    table.getColumn(column.id.toString())?.setFilterValue(event.target.value)
                  }
                  className="h-8 w-[150px] lg:w-[200px]"
                />
              ))}
            </div>
          )}

          {/* Filtros Facetados */}
          {filterFields.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {filterFields.map((column) => {
                const tableColumn = table.getColumn(column.id)
                const facetValues = facetCounts?.[column.id] ?? {}
                
                return (
                  <DataTableFacetedFilter
                    key={column.id}
                    column={tableColumn}
                    title={column.title}
                    options={column.options}
                    facetCounts={facetCounts}
                  />
                )
              })}
            </div>
          )}

          {/* Botão de Limpar Filtros */}
          {isFiltered && (
            <Button
              variant="outline"
              onClick={() => table.resetColumnFilters()}
              className="h-8"
            >
              Limpar filtros
            </Button>
          )}
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
