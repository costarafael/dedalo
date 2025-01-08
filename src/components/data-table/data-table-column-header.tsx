"use client"

import * as React from "react"
import type { Column } from "@tanstack/react-table"
import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  const ascValue = `${column.id}-asc`
  const descValue = `${column.id}-desc`
  const hideValue = `${column.id}-hide`

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Select
        value={
          column.getIsSorted() === "desc"
            ? descValue
            : column.getIsSorted() === "asc"
              ? ascValue
              : undefined
        }
        onValueChange={(value) => {
          if (value === ascValue) column.toggleSorting(false)
          else if (value === descValue) column.toggleSorting(true)
          else if (value === hideValue) column.toggleVisibility(false)
        }}
      >
        <SelectTrigger
          aria-label={
            column.getIsSorted() === "desc"
              ? "Ordenado decrescente. Clique para ordenar crescente."
              : column.getIsSorted() === "asc"
                ? "Ordenado crescente. Clique para ordenar decrescente."
                : "Não ordenado. Clique para ordenar crescente."
          }
          className="-ml-3 h-8 w-fit border-none text-xs hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent [&>svg:last-child]:hidden"
        >
          {title}
          {column.getCanSort() && column.getIsSorted() === "desc" ? (
            <ArrowDown className="ml-2.5 h-4 w-4" aria-hidden="true" />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUp className="ml-2.5 h-4 w-4" aria-hidden="true" />
          ) : (
            <ChevronsUpDown className="ml-2.5 h-4 w-4" aria-hidden="true" />
          )}
        </SelectTrigger>
        <SelectContent align="start">
          {column.getCanSort() && (
            <>
              <SelectItem value={ascValue}>
                <span className="flex items-center">
                  <ArrowUp
                    className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
                    aria-hidden="true"
                  />
                  Asc
                </span>
              </SelectItem>
              <SelectItem value={descValue}>
                <span className="flex items-center">
                  <ArrowDown
                    className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
                    aria-hidden="true"
                  />
                  Desc
                </span>
              </SelectItem>
            </>
          )}
          {column.getCanHide() && (
            <SelectItem value={hideValue}>
              <span className="flex items-center">
                <EyeOff
                  className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
                  aria-hidden="true"
                />
                Ocultar
              </span>
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  )
}
