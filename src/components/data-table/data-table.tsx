"use client"

import * as React from "react"
import type { ColumnDef, Table } from "@tanstack/react-table"
import { flexRender } from "@tanstack/react-table"

import {
  Table as TableUI,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { DataTableLoading } from "./data-table-loading"
import { DataTablePagination } from "./data-table-pagination"

interface DataTableProps<TData, TValue> {
  table: Table<TData>
  columns: ColumnDef<TData, TValue>[]
  isLoading?: boolean
  error?: string
  facetCounts?: Record<string, Record<string, number>>
  "aria-label"?: string
  "aria-describedby"?: string
}

export function DataTable<TData, TValue>({
  table,
  columns,
  isLoading,
  error,
  facetCounts,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedby,
}: DataTableProps<TData, TValue>) {
  return (
    <div className="w-full space-y-4">
      <div className="rounded-md border">
        <TableUI aria-label={ariaLabel} aria-describedby={ariaDescribedby}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <DataTableLoading columns={columns} />
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  aria-selected={row.getIsSelected()}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="p-4 align-middle [&:has([role=checkbox])]:pr-0"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </TableUI>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}
