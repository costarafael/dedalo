import type { ExtendedSortingState, Filter, AdvancedFilter } from "@/types"
import { type Row } from "@tanstack/react-table"
import { createParser } from "nuqs/server"
import { z } from "zod"

import { dataTableConfig } from "@/config/data-table"

// Schema para ordenação
export const sortingItemSchema = z.object({
  id: z.string(),
  desc: z.boolean(),
})

// Schema para paginação
export const paginationSchema = z.object({
  pageIndex: z.number(),
  pageSize: z.number(),
})

// Schema para filtros avançados
export const advancedFilterSchema = z.object({
  id: z.string(),
  value: z.union([z.string(), z.array(z.string())]),
  operator: z.enum(dataTableConfig.globalOperators),
  type: z.enum(["text", "number", "date", "boolean", "select", "multi-select"]).optional(),
})

// Schema para filtros básicos
export const filterSchema = z.object({
  id: z.string(),
  field: z.string(),
  value: z.union([z.string(), z.array(z.string())]),
  operator: z.enum(dataTableConfig.globalOperators),
})

/**
 * Cria um parser para o estado de ordenação
 */
export const getSortingStateParser = <TData>(
  originalRow?: Row<TData>["original"]
) => {
  const validKeys = originalRow ? new Set(Object.keys(originalRow)) : null

  return createParser<ExtendedSortingState<TData>>({
    parse: (value) => {
      try {
        const parsed = JSON.parse(value)
        const result = z.array(sortingItemSchema).safeParse(parsed)

        if (!result.success) return null

        if (validKeys && result.data.some((item) => !validKeys.has(item.id))) {
          return null
        }

        return result.data as ExtendedSortingState<TData>
      } catch {
        return null
      }
    },
    serialize: (value) => JSON.stringify(value),
    eq: (a, b) =>
      a.length === b.length &&
      a.every(
        (item, index) =>
          item.id === b[index]?.id && item.desc === b[index]?.desc
      ),
  })
}

/**
 * Cria um parser para o estado de paginação
 */
export const getPaginationStateParser = () => {
  return createParser({
    parse: (value) => {
      try {
        const parsed = JSON.parse(value)
        const result = paginationSchema.safeParse(parsed)
        return result.success ? result.data : null
      } catch {
        return null
      }
    },
    serialize: (value) => JSON.stringify(value),
    eq: (a, b) =>
      a.pageIndex === b.pageIndex && a.pageSize === b.pageSize,
  })
}

/**
 * Cria um parser para os filtros básicos
 */
export const getFiltersStateParser = <TData>(
  originalRow?: Row<TData>["original"]
) => {
  const validKeys = originalRow ? new Set(Object.keys(originalRow)) : null

  return createParser<Filter<TData>[]>({
    parse: (value) => {
      try {
        const parsed = JSON.parse(value)
        const result = z.array(filterSchema).safeParse(parsed)

        if (!result.success) return null

        if (validKeys && result.data.some((item) => !validKeys.has(item.field))) {
          return null
        }

        return result.data as Filter<TData>[]
      } catch {
        return null
      }
    },
    serialize: (value) => JSON.stringify(value),
    eq: (a, b) =>
      a.length === b.length &&
      a.every(
        (filter, index) =>
          filter.id === b[index]?.id &&
          filter.field === b[index]?.field &&
          filter.value === b[index]?.value &&
          filter.operator === b[index]?.operator
      ),
  })
}

/**
 * Cria um parser para os filtros avançados
 */
export const getAdvancedFiltersStateParser = () => {
  return createParser<AdvancedFilter[]>({
    parse: (value) => {
      try {
        const parsed = JSON.parse(value)
        const result = z.array(advancedFilterSchema).safeParse(parsed)
        return result.success ? result.data : null
      } catch {
        return null
      }
    },
    serialize: (value) => JSON.stringify(value),
    eq: (a, b) =>
      a.length === b.length &&
      a.every(
        (filter, index) =>
          filter.id === b[index]?.id &&
          filter.value === b[index]?.value &&
          filter.operator === b[index]?.operator &&
          filter.type === b[index]?.type
      ),
  })
}

/**
 * Cria um parser para o filtro global
 */
export const getGlobalFilterStateParser = () => {
  return createParser({
    parse: (value) => value,
    serialize: (value) => value,
    eq: (a, b) => a === b,
  })
}

/**
 * Cria um parser para a visibilidade das colunas
 */
export const getColumnVisibilityStateParser = () => {
  return createParser<Record<string, boolean>>({
    parse: (value) => {
      try {
        return JSON.parse(value)
      } catch {
        return null
      }
    },
    serialize: (value) => JSON.stringify(value),
    eq: (a, b) => JSON.stringify(a) === JSON.stringify(b),
  })
}
