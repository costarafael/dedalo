"use client"

import { useCallback, useEffect, useState, useRef } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  type PaginationState,
  useReactTable,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table"
import { useQueryState } from "nuqs"
import { useDebounce } from "@/hooks/use-debounce"
import type { DataTableFilterableColumn, DataTableSearchableColumn } from "@/types"
import {
  getAdvancedFiltersStateParser,
  getColumnVisibilityStateParser,
  getFiltersStateParser,
  getGlobalFilterStateParser,
  getPaginationStateParser,
  getSortingStateParser,
} from "@/lib/parsers"

interface UseDataTableProps<TData> {
  data: TData[]
  columns: ColumnDef<any>[]
  pageCount: number
  searchableColumns?: DataTableSearchableColumn<TData>[]
  filterableColumns?: DataTableFilterableColumn<TData>[]
  onRowsChange?: (rows: TData[]) => void
  onPageCountChange?: (pageCount: number) => void
  onLoadingChange?: (isLoading: boolean) => void
  onError?: (error: string) => void
  enableAdvancedFilter?: boolean
  module: { slug: string }
  template: { slug: string }
}

interface FacetCounts {
  [key: string]: {
    [value: string]: number
  }
}

export function useDataTable<TData>({
  data,
  columns,
  pageCount: initialPageCount,
  searchableColumns = [],
  filterableColumns = [],
  onRowsChange,
  onPageCountChange,
  onLoadingChange,
  onError,
  enableAdvancedFilter = false,
  module,
  template,
}: UseDataTableProps<TData>) {
  const isMounted = useRef(false)
  const lastFetchTime = useRef(0)
  
  // Estados sincronizados com URL via nuqs
  const [pagination, setPagination] = useQueryState(
    "pagination",
    getPaginationStateParser()
  )
  const [sorting, setSorting] = useQueryState(
    "sorting",
    getSortingStateParser<TData>()
  )
  const [columnFilters, setColumnFilters] = useQueryState(
    "filters",
    getFiltersStateParser<TData>()
  )
  const [advancedFilters, setAdvancedFilters] = useQueryState(
    "advancedFilters",
    getAdvancedFiltersStateParser()
  )
  const [globalFilter, setGlobalFilter] = useQueryState(
    "search",
    getGlobalFilterStateParser()
  )
  const [columnVisibility, setColumnVisibility] = useQueryState(
    "visibility",
    getColumnVisibilityStateParser()
  )

  // Estados locais
  const [rowSelection, setRowSelection] = useState({})
  const [pageCount, setPageCount] = useState(initialPageCount)
  const [facetCounts, setFacetCounts] = useState<FacetCounts>({})
  
  // Valores padrão
  const defaultPagination = {
    pageIndex: 0,
    pageSize: 10,
  }

  const currentPagination = pagination ?? defaultPagination
  const currentSorting = sorting ?? []
  const currentColumnFilters = columnFilters ?? []
  const currentAdvancedFilters = advancedFilters ?? []
  const currentGlobalFilter = globalFilter ?? ""
  const currentColumnVisibility = columnVisibility ?? {}
  
  const debouncedGlobalFilter = useDebounce(currentGlobalFilter, 500)

  // Adaptadores para os handlers de mudança de estado
  const handlePaginationChange = useCallback(
    (updater: PaginationState | ((old: PaginationState) => PaginationState)) => {
      const newValue = typeof updater === 'function' ? updater(currentPagination) : updater
      setPagination(newValue)
    },
    [currentPagination, setPagination]
  )

  const handleSortingChange = useCallback(
    (updater: SortingState | ((old: SortingState) => SortingState)) => {
      const newValue = typeof updater === 'function' ? updater(currentSorting) : updater
      setSorting(newValue as any)
    },
    [currentSorting, setSorting]
  )

  const handleColumnFiltersChange = useCallback(
    (updater: ColumnFiltersState | ((old: ColumnFiltersState) => ColumnFiltersState)) => {
      const newValue = typeof updater === 'function' ? updater(currentColumnFilters) : updater
      setColumnFilters(newValue as any)
    },
    [currentColumnFilters, setColumnFilters]
  )

  const handleColumnVisibilityChange = useCallback(
    (updater: VisibilityState | ((old: VisibilityState) => VisibilityState)) => {
      const newValue = typeof updater === 'function' ? updater(currentColumnVisibility) : updater
      setColumnVisibility(newValue)
    },
    [currentColumnVisibility, setColumnVisibility]
  )

  const handleGlobalFilterChange = useCallback(
    (value: string) => {
      setGlobalFilter(value)
    },
    [setGlobalFilter]
  )

  // Função para buscar dados
  const fetchData = useCallback(async () => {
    if (!isMounted.current) return

    const now = Date.now()
    if (now - lastFetchTime.current < 300) return
    lastFetchTime.current = now

    try {
      if (!data.length) {
        onLoadingChange?.(true)
      }

      const params = new URLSearchParams()
      
      // Paginação
      params.set("page", `${currentPagination.pageIndex + 1}`)
      params.set("per_page", `${currentPagination.pageSize}`)
      params.set("include_facets", "true")

      // Log da URL e parâmetros para debug
      console.log('Request URL:', `/api/${module.slug}/${template.slug}`)
      console.log('Request params:', params.toString())

      // Ordenação
      if (currentSorting.length > 0) {
        params.set("sort", currentSorting[0].id as string)
        params.set("order", currentSorting[0].desc ? "desc" : "asc")
      }

      // Filtros
      if (enableAdvancedFilter) {
        if (currentAdvancedFilters.length > 0) {
          params.set("filters", JSON.stringify(currentAdvancedFilters))
        }
      } else {
        // Filtro global
        if (debouncedGlobalFilter && searchableColumns.length > 0) {
          searchableColumns.forEach(column => {
            params.set(column.id as string, debouncedGlobalFilter)
          })
        }

        // Filtros de coluna
        currentColumnFilters.forEach(filter => {
          if (Array.isArray(filter.value)) {
            params.set(filter.id, filter.value.join(','))
          } else {
            params.set(filter.id, String(filter.value))
          }
        })
      }

      // Campos para facets
      filterableColumns.forEach(column => {
        params.append("facet_fields[]", column.id as string)
      })

      const response = await fetch(`/api/${module.slug}/${template.slug}?${params.toString()}`)
      
      // Log da resposta para debug
      console.log('Response status:', response.status)
      console.log('Response data:', await response.clone().json())
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      
      const json = await response.json()
      
      if (json.data && Array.isArray(json.data)) {
        onRowsChange?.(json.data)
        setPageCount(json.meta.total_pages)
        onPageCountChange?.(json.meta.total_pages)
        if (json.meta.facets) {
          console.log('Facet counts:', json.meta.facets)
          setFacetCounts(json.meta.facets)
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      onError?.(error instanceof Error ? error.message : "Erro ao carregar dados")
    } finally {
      onLoadingChange?.(false)
    }
  }, [
    currentPagination,
    currentSorting,
    currentColumnFilters,
    currentAdvancedFilters,
    debouncedGlobalFilter,
    data.length,
    enableAdvancedFilter,
    filterableColumns,
    searchableColumns,
    onRowsChange,
    onPageCountChange,
    onLoadingChange,
    onError,
    module.slug,
    template.slug,
  ])

  // Efeito para inicializar o estado mounted
  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  // Efeito para buscar dados quando os parâmetros mudam
  useEffect(() => {
    void fetchData()
  }, [fetchData])

  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: {
      pagination: currentPagination,
      sorting: currentSorting,
      columnVisibility: currentColumnVisibility,
      rowSelection,
      columnFilters: enableAdvancedFilter ? [] : currentColumnFilters,
      globalFilter: currentGlobalFilter,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: handlePaginationChange,
    onSortingChange: handleSortingChange,
    onColumnFiltersChange: handleColumnFiltersChange,
    onColumnVisibilityChange: handleColumnVisibilityChange,
    onGlobalFilterChange: handleGlobalFilterChange,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: enableAdvancedFilter ? undefined : getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: enableAdvancedFilter ? undefined : getFacetedRowModel(),
    getFacetedUniqueValues: enableAdvancedFilter ? undefined : getFacetedUniqueValues(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
  })

  return {
    table,
    setData: (newData: TData[]) => {
      table.setData(newData)
    },
    facetCounts,
  }
}
