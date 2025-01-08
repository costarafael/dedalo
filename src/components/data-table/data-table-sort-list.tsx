"use client"

import * as React from "react"
import type {
  ExtendedColumnSort,
  ExtendedSortingState,
  StringKeyOf,
} from "@/types"
import type { SortDirection, Table } from "@tanstack/react-table"
import {
  ArrowDownUp,
  Check,
  ChevronsUpDown,
  GripVertical,
  Trash2,
} from "lucide-react"
import { useQueryState } from "nuqs"

import { dataTableConfig } from "@/config/data-table"
import { getSortingStateParser } from "@/lib/parsers"
import { cn } from "@/lib/utils"
import { useDebouncedCallback } from "@/hooks/use-debounced-callback"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sortable,
  SortableDragHandle,
  SortableItem,
} from "@/components/ui/sortable"
import { Separator } from "@/components/ui/separator"

interface DataTableSortListProps<TData> {
  table: Table<TData>
  debounceMs: number
  shallow?: boolean
}

export function DataTableSortList<TData>({
  table,
  debounceMs,
  shallow,
}: DataTableSortListProps<TData>) {
  const id = React.useId()
  const [open, setOpen] = React.useState(false)
  const [sorting, setSorting] = useQueryState(
    "sorting",
    getSortingStateParser<TData>().withDefault([]).withOptions({
      clearOnDefault: true,
      shallow,
    })
  )

  const debouncedSetSorting = useDebouncedCallback(setSorting, debounceMs)

  function addSort() {
    if (!sorting) return

    const firstColumn = table.getAllColumns().find((col) => col.getCanSort())
    if (!firstColumn) return

    const sort: ExtendedColumnSort<TData> = {
      id: firstColumn.id as StringKeyOf<TData>,
      desc: false,
    }

    setSorting([...sorting, sort])
    setOpen(true)
  }

  function updateSort({
    id,
    field,
    debounced = false,
  }: {
    id: string
    field: Partial<ExtendedColumnSort<TData>>
    debounced?: boolean
  }) {
    if (!sorting) return

    const newSorting = sorting.map((s) => {
      if (s.id === id) {
        return { ...s, ...field }
      }
      return s
    })

    if (debounced) {
      debouncedSetSorting(newSorting)
    } else {
      setSorting(newSorting)
    }
    setOpen(true)
  }

  function removeSort(id: string) {
    if (!sorting) return
    setSorting(sorting.filter((s) => s.id !== id))
    setOpen(true)
  }

  return (
    <Popover open={open} onOpenChange={setOpen} modal={false}>
      <PopoverTrigger asChild>
        <Button
          aria-label="Sort rows"
          size="sm"
          variant="outline"
          className="h-8 border-dashed"
        >
          <ArrowDownUp className="mr-2 h-4 w-4" />
          Ordenar
          {sorting?.length > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {sorting.length}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {sorting.length > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {sorting.length} ordenações
                  </Badge>
                ) : (
                  table
                    .getAllColumns()
                    .filter((column) =>
                      sorting.some((sort) => sort.id === column.id)
                    )
                    .map((column) => (
                      <Badge
                        variant="secondary"
                        key={column.id}
                        className="rounded-sm px-1 font-normal"
                      >
                        {column.columnDef.header?.toString()}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[95vw] p-0 md:w-[520px]" align="start">
        <div className="space-y-2 p-4">
          <Sortable
            items={sorting ?? []}
            onItemsChange={(items) => setSorting(items as ExtendedSortingState<TData>)}
            onDragEnd={() => setOpen(true)}
            handle
          >
            {sorting?.map((sort) => (
              <SortableItem key={sort.id} id={sort.id}>
                <div className="flex items-center gap-2">
                  <SortableDragHandle>
                    <GripVertical className="h-4 w-4" />
                  </SortableDragHandle>
                  <Select
                    value={sort.id as string}
                    onValueChange={(value) =>
                      updateSort({
                        id: sort.id,
                        field: { id: value as StringKeyOf<TData> },
                      })
                    }
                  >
                    <SelectTrigger className="h-8 w-[150px]">
                      <SelectValue>
                        {table
                          .getAllColumns()
                          .find((col) => col.id === sort.id)
                          ?.columnDef.header?.toString()}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {table
                        .getAllColumns()
                        .filter((col) => col.getCanSort())
                        .map((col) => (
                          <SelectItem key={col.id} value={col.id}>
                            {col.columnDef.header?.toString()}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={sort.desc ? "desc" : "asc"}
                    onValueChange={(value) =>
                      updateSort({
                        id: sort.id,
                        field: { desc: value === "desc" },
                      })
                    }
                  >
                    <SelectTrigger className="h-8 w-[120px]">
                      <SelectValue>
                        {sort.desc ? "Decrescente" : "Crescente"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asc">Crescente</SelectItem>
                      <SelectItem value="desc">Decrescente</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => removeSort(sort.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remover ordenação</span>
                  </Button>
                </div>
              </SortableItem>
            ))}
          </Sortable>
          <Button
            size="sm"
            className="mt-2"
            onClick={() => addSort()}
          >
            Adicionar ordenação
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
