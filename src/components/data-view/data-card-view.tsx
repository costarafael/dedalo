"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { DataTablePagination } from "@/components/data-table/data-table-pagination"

interface ColumnMeta {
  isTitle?: boolean
  isFooter?: boolean
  title?: string
}

type ExtendedColumnDef<TData> = ColumnDef<TData, unknown> & {
  accessorKey?: string
  meta?: ColumnMeta
}

interface DataCardViewProps<TData extends Record<string, any>> {
  data: TData[]
  columns: ExtendedColumnDef<TData>[]
  cardClassName?: string
  renderCustomCard?: (item: TData) => React.ReactNode
  renderHeader?: (item: TData) => React.ReactNode
  renderContent?: (item: TData) => React.ReactNode
  renderFooter?: (item: TData) => React.ReactNode
  table: any
}

export function DataCardView<TData extends Record<string, any>>({
  data,
  columns,
  cardClassName,
  renderCustomCard,
  renderHeader,
  renderContent,
  renderFooter,
  table
}: DataCardViewProps<TData>) {
  // Função auxiliar para renderizar o valor de uma coluna
  const renderColumnValue = (item: TData, column: ExtendedColumnDef<TData>) => {
    if (!column.accessorKey) return null
    const value = item[column.accessorKey]
    
    if (typeof column.cell === 'function') {
      return column.cell({ 
        getValue: () => value,
        renderValue: () => value,
        row: { 
          original: item,
          getValue: () => value,
          renderValue: () => value,
        } as any,
        column: column as any,
        table: {
          options: {
            renderFallbackValue: undefined,
          },
        } as any,
        value,
      })
    }

    return value
  }

  // Renderização padrão do header
  const defaultHeader = (item: TData) => {
    const titleColumn = columns.find(col => col.meta?.isTitle)
    if (!titleColumn) return null

    return (
      <CardHeader>
        <h3 className="text-lg font-semibold">
          {renderColumnValue(item, titleColumn)}
        </h3>
      </CardHeader>
    )
  }

  // Renderização padrão do conteúdo
  const defaultContent = (item: TData) => {
    const contentColumns = columns.filter(col => 
      !col.meta?.isTitle && 
      !col.meta?.isFooter
    )
    
    return (
      <CardContent className="grid gap-4">
        {contentColumns.map((column, index) => {
          if (!column.accessorKey) return null
          const columnTitle = column.meta?.title || column.accessorKey

          return (
            <div 
              key={index} 
              className="flex flex-col space-y-1"
              role="group"
              aria-labelledby={`${column.accessorKey}-label-${index}`}
            >
              <span 
                id={`${column.accessorKey}-label-${index}`}
                className="text-sm font-medium text-muted-foreground"
              >
                {columnTitle}
              </span>
              <span aria-label={`${columnTitle}: ${renderColumnValue(item, column)}`}>
                {renderColumnValue(item, column)}
              </span>
            </div>
          )
        })}
      </CardContent>
    )
  }

  // Renderização padrão do footer
  const defaultFooter = (item: TData) => {
    const footerColumns = columns.filter(col => col.meta?.isFooter)
    if (footerColumns.length === 0) return null

    return (
      <CardFooter className="flex justify-between">
        {footerColumns.map((column, index) => {
          const columnTitle = column.meta?.title || column.accessorKey

          return (
            <div 
              key={index}
              role="status"
              aria-label={`${columnTitle}: ${renderColumnValue(item, column)}`}
            >
              {renderColumnValue(item, column)}
            </div>
          )
        })}
      </CardFooter>
    )
  }

  const content = (
    <div 
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      role="grid"
      aria-label="Lista de itens em formato de cards"
    >
      {data.map((item, index) => (
        renderCustomCard ? (
          <div 
            key={index}
            role="gridcell"
            tabIndex={0}
          >
            {renderCustomCard(item)}
          </div>
        ) : (
          <Card 
            key={index} 
            className={cn("flex flex-col", cardClassName)}
            role="gridcell"
            tabIndex={0}
            aria-label={`Card ${index + 1} de ${data.length}`}
          >
            {(renderHeader || defaultHeader)(item)}
            {(renderContent || defaultContent)(item)}
            {(renderFooter || defaultFooter)(item)}
          </Card>
        )
      ))}
    </div>
  )

  return (
    <div 
      className="space-y-4"
      role="region"
      aria-label="Visualização em cards"
    >
      {content}
      <DataTablePagination table={table} />
    </div>
  )
} 