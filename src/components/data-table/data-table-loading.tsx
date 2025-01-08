"use client"

import { TableCell, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

interface DataTableLoadingProps {
  columns: any[]
  rowCount?: number
}

export function DataTableLoading({
  columns,
  rowCount = 10,
}: DataTableLoadingProps) {
  return Array(rowCount)
    .fill(null)
    .map((_, i) => (
      <TableRow key={i}>
        {columns.map((column, i) => (
          <TableCell key={i}>
            <Skeleton className="h-6 w-full" />
          </TableCell>
        ))}
      </TableRow>
    ))
} 