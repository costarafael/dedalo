"use client"

import * as React from "react"
import type {
  DataTableAdvancedFilterField,
  Filter,
  FilterOperator,
  JoinOperator,
} from "@/types"
import { type Table } from "@tanstack/react-table"
import {
  CalendarIcon,
  Check,
  ChevronsUpDown,
  GripVertical,
  ListFilter,
  Trash2,
} from "lucide-react"
import { customAlphabet } from "nanoid"
import { parseAsStringEnum, useQueryState } from "nuqs"

import { dataTableConfig } from "@/config/data-table"
import { getDefaultFilterOperator, getFilterOperators } from "@/lib/data-table"
import { getFiltersStateParser } from "@/lib/parsers"
import { cn, formatDate } from "@/lib/utils"
import { useDebouncedCallback } from "@/hooks/use-debounced-callback"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  FacetedFilter,
  FacetedFilterContent,
  FacetedFilterEmpty,
  FacetedFilterGroup,
  FacetedFilterInput,
  FacetedFilterItem,
  FacetedFilterList,
  FacetedFilterTrigger,
} from "@/components/ui/faceted-filter"
import { Input } from "@/components/ui/input"
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

interface DataTableFilterListProps<TData> {
  table: Table<TData>
  filterFields: DataTableAdvancedFilterField<TData>[]
  debounceMs: number
  shallow?: boolean
}

export function DataTableFilterList<TData>({
  table,
  filterFields,
  debounceMs,
  shallow,
}: DataTableFilterListProps<TData>) {
  const id = React.useId()
  const [open, setOpen] = React.useState(false)
  const [filters, setFilters] = useQueryState(
    "filters",
    getFiltersStateParser<TData>(table.getRowModel().rows[0]?.original)
      .withDefault([])
      .withOptions({
        clearOnDefault: true,
        shallow,
      })
  )

  const [joinOperator, setJoinOperator] = useQueryState(
    "joinOperator",
    parseAsStringEnum(["and", "or"]).withDefault("and").withOptions({
      clearOnDefault: true,
      shallow,
    })
  )

  const debouncedSetFilters = useDebouncedCallback(setFilters, debounceMs)

  function addFilter() {
    if (!filters) return

    const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10)
    const filter: Filter<TData> = {
      id: nanoid(),
      field: filterFields[0]?.id ?? ("" as keyof TData),
      value: "",
      operator: getDefaultFilterOperator(filterFields[0]?.type ?? "text"),
    }

    setFilters([...filters, filter])
    setOpen(true)
  }

  function updateFilter({
    id,
    field,
    debounced = false,
  }: {
    id: string
    field: Partial<Filter<TData>>
    debounced?: boolean
  }) {
    if (!filters) return

    const newFilters = filters.map((f) => {
      if (f.id === id) {
        return { ...f, ...field }
      }
      return f
    })

    if (debounced) {
      debouncedSetFilters(newFilters)
    } else {
      setFilters(newFilters)
    }
    setOpen(true)
  }

  function removeFilter(id: string) {
    if (!filters) return
    setFilters(filters.filter((f) => f.id !== id))
    setOpen(true)
  }

  return (
    <Popover open={open} onOpenChange={setOpen} modal={false}>
      <PopoverTrigger asChild>
        <Button
          aria-label="Filter rows"
          size="sm"
          variant="outline"
          className="h-8 border-dashed"
        >
          <ListFilter className="mr-2 h-4 w-4" />
          Filtros
          {filters?.length > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {filters.length}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {filters.length > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {filters.length} filtros
                  </Badge>
                ) : (
                  filterFields
                    .filter((field) =>
                      filters.some((filter) => filter.field === field.id)
                    )
                    .map((field) => (
                      <Badge
                        variant="secondary"
                        key={field.id as string}
                        className="rounded-sm px-1 font-normal"
                      >
                        {field.label}
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
          {filters?.length > 0 && (
            <div className="flex items-center gap-2">
              <Select
                value={joinOperator}
                onValueChange={(value) =>
                  setJoinOperator(value as JoinOperator)
                }
              >
                <SelectTrigger className="h-8 w-[120px]">
                  <SelectValue>
                    {joinOperator === "and" ? "Todos" : "Qualquer"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {dataTableConfig.joinOperators.map((op) => (
                    <SelectItem key={op.value} value={op.value}>
                      {op.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground">
                dos seguintes filtros:
              </span>
            </div>
          )}
          <Sortable
            items={filters ?? []}
            onItemsChange={(items) => setFilters(items)}
            onDragEnd={() => setOpen(true)}
            handle
          >
            {filters?.map((filter) => (
              <SortableItem key={filter.id} id={filter.id}>
                <div className="flex items-center gap-2">
                  <SortableDragHandle>
                    <GripVertical className="h-4 w-4" />
                  </SortableDragHandle>
                  <Select
                    value={filter.field as string}
                    onValueChange={(value) =>
                      updateFilter({
                        id: filter.id,
                        field: {
                          field: value as keyof TData,
                          operator: getDefaultFilterOperator(
                            filterFields.find((f) => f.id === value)?.type ??
                              "text"
                          ),
                          value: "",
                        },
                      })
                    }
                  >
                    <SelectTrigger className="h-8 w-[150px]">
                      <SelectValue>
                        {filterFields.find((f) => f.id === filter.field)?.label}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {filterFields.map((field) => (
                        <SelectItem key={field.id as string} value={field.id as string}>
                          {field.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={filter.operator}
                    onValueChange={(value) =>
                      updateFilter({
                        id: filter.id,
                        field: {
                          operator: value as FilterOperator,
                        },
                      })
                    }
                  >
                    <SelectTrigger className="h-8 w-[140px]">
                      <SelectValue>
                        {
                          dataTableConfig.filterOperators[
                            filter.operator
                          ]
                        }
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {getFilterOperators(
                        filterFields.find((f) => f.id === filter.field)?.type ??
                          "text"
                      ).map((operator) => (
                        <SelectItem key={operator} value={operator}>
                          {
                            dataTableConfig.filterOperators[
                              operator
                            ]
                          }
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {filterFields.find((f) => f.id === filter.field)?.type ===
                  "select" ? (
                    <FacetedFilter>
                      <FacetedFilterTrigger
                        className="h-8"
                        value={filter.value as string}
                      >
                        <span className="w-[120px] truncate">
                          {filter.value
                            ? filterFields
                                .find((f) => f.id === filter.field)
                                ?.options?.find(
                                  (option) => option.value === filter.value
                                )?.label
                            : "Selecione..."}
                        </span>
                      </FacetedFilterTrigger>
                      <FacetedFilterContent align="start" className="w-[200px]">
                        <Command>
                          <CommandInput placeholder="Buscar..." />
                          <CommandList>
                            <CommandEmpty>Nenhum resultado.</CommandEmpty>
                            <CommandGroup>
                              {filterFields
                                .find((f) => f.id === filter.field)
                                ?.options?.map((option) => (
                                  <CommandItem
                                    key={option.value}
                                    onSelect={() =>
                                      updateFilter({
                                        id: filter.id,
                                        field: { value: option.value },
                                      })
                                    }
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        option.value === filter.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {option.label}
                                  </CommandItem>
                                ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </FacetedFilterContent>
                    </FacetedFilter>
                  ) : filterFields.find((f) => f.id === filter.field)?.type ===
                    "date" ? (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "h-8 w-[140px] justify-start text-left font-normal",
                            !filter.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {filter.value ? (
                            formatDate(filter.value as string)
                          ) : (
                            <span>Selecione...</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            filter.value
                              ? new Date(filter.value as string)
                              : undefined
                          }
                          onSelect={(date) =>
                            updateFilter({
                              id: filter.id,
                              field: {
                                value: date?.toISOString() ?? "",
                              },
                            })
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  ) : (
                    <Input
                      placeholder="Valor..."
                      className="h-8"
                      value={filter.value as string}
                      onChange={(e) =>
                        updateFilter({
                          id: filter.id,
                          field: { value: e.target.value },
                          debounced: true,
                        })
                      }
                    />
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => removeFilter(filter.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remover filtro</span>
                  </Button>
                </div>
              </SortableItem>
            ))}
          </Sortable>
          <Button
            size="sm"
            className="mt-2"
            onClick={() => addFilter()}
          >
            Adicionar filtro
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
