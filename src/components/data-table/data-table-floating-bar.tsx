"use client"

import * as React from "react"
import type { Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Cross2Icon, TrashIcon } from "@radix-ui/react-icons"

interface DataTableFloatingBarProps<TData> {
  table: Table<TData>
  onDelete?: (selectedRows: TData[]) => void
}

export function DataTableFloatingBar<TData>({
  table,
  onDelete,
}: DataTableFloatingBarProps<TData>) {
  const selectedRows = table.getFilteredSelectedRowModel().rows
  
  if (selectedRows.length === 0) return null

  return (
    <div className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2 rounded-lg border bg-background p-4 shadow-lg">
      <div className="flex items-center gap-4">
        <Button
          aria-label="Limpar seleção"
          variant="ghost"
          onClick={() => table.toggleAllRowsSelected(false)}
        >
          <Cross2Icon className="h-4 w-4" aria-hidden="true" />
        </Button>
        <div className="text-sm font-medium">
          {selectedRows.length} item(s) selecionado(s)
        </div>
        {onDelete ? (
          <Button
            aria-label="Deletar selecionados"
            variant="ghost"
            onClick={() => onDelete(selectedRows.map(row => row.original))}
          >
            <TrashIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
        ) : null}
      </div>
    </div>
  )
}
