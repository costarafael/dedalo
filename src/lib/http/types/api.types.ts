import type { AxiosResponse } from 'axios'

// Tipo base para respostas da API
export interface ApiResponse<T = any> {
  data: T
  status: number
  message?: string
}

// Tipo para erros da API
export interface ApiError {
  code: string
  message: string
  details?: any
}

// Tipo para configuração de requisições
export interface RequestConfig {
  headers?: Record<string, string>
  params?: Record<string, any>
  signal?: AbortSignal
}

// Tipo para paginação
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

// Tipo para resposta com cache
export interface CachedResponse<T> extends AxiosResponse<T> {
  timestamp: number
  isStale: boolean
}

// Enum para métodos HTTP
export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH'
}

// Tipo para status de loading
export interface LoadingState {
  isLoading: boolean
  isError: boolean
  error?: ApiError
} 