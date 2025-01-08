"use client"

import * as React from "react"
import { type ColumnDef, type Table } from "@tanstack/react-table"
import { useQueryState } from "nuqs"
import { Menu } from "lucide-react"

import { DataTable } from "@/components/data-table/data-table"
import { DataCardView } from "./data-card-view"
import { ViewToggle } from "./view-toggle"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

type ExtendedColumnDef<TData> = ColumnDef<TData, unknown> & {
  accessorKey?: string
  meta?: {
    isTitle?: boolean
    isHeader?: boolean
    isFooter?: boolean
    title?: string
  }
}

interface DataViewProps<TData extends Record<string, any>> {
  data: TData[]
  columns: ExtendedColumnDef<TData>[]
  table: Table<TData>
  searchableColumns?: any[]
  filterableColumns?: any[]
  toolbar?: React.ReactElement
  cardClassName?: string
  renderCustomCard?: (item: TData) => React.ReactNode
  renderHeader?: (item: TData) => React.ReactNode
  renderContent?: (item: TData) => React.ReactNode
  renderFooter?: (item: TData) => React.ReactNode
  facetCounts?: Record<string, Record<string, number>>
  isLoading?: boolean
  error?: string
}

export function DataView<TData extends Record<string, any>>({
  data,
  columns,
  table,
  searchableColumns,
  filterableColumns,
  toolbar,
  cardClassName,
  renderCustomCard,
  renderHeader,
  renderContent,
  renderFooter,
  facetCounts,
  isLoading,
  error
}: DataViewProps<TData>) {
  const [viewMode] = useQueryState("viewMode", {
    defaultValue: "table",
    parse: (value: string) => value === "card" ? "card" : "table",
    serialize: (value: string) => value,
  })

  // Renderiza a toolbar com o viewToggle
  const toolbarWithViewToggle = toolbar ? React.cloneElement(toolbar, {
    viewToggle: <ViewToggle />,
    className: "w-full"
  }) : null

  return (
    <div className="space-y-4">
      {/* Toolbar para Desktop e Tablet */}
      <div className="hidden sm:block">
        {toolbarWithViewToggle}
      </div>

      {/* Toolbar para Mobile */}
      <div className="flex sm:hidden items-center justify-between gap-2">
        <ViewToggle />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Menu className="h-4 w-4" />
              <span className="sr-only">Abrir filtros e opções</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full">
            <SheetHeader>
              <SheetTitle>Filtros e Opções</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 py-4">
              {toolbar}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {viewMode === "table" ? (
        <DataTable
          table={table}
          columns={columns}
          facetCounts={facetCounts}
          isLoading={isLoading}
          error={error}
        />
      ) : (
        <DataCardView
          data={data}
          columns={columns}
          table={table}
          cardClassName={cardClassName}
          renderCustomCard={renderCustomCard}
          renderHeader={renderHeader}
          renderContent={renderContent}
          renderFooter={renderFooter}
        />
      )}
    </div>
  )
}