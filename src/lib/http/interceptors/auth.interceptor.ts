import type { InternalAxiosRequestConfig } from 'axios'
import { getBrowserClient } from '@/lib/database/supabase'

export const authInterceptor = async (config: InternalAxiosRequestConfig) => {
  try {
    const supabase = getBrowserClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (session?.access_token) {
      config.headers = config.headers || {}
      config.headers['Authorization'] = `Bearer ${session.access_token}`
    }

    return config
  } catch (error) {
    console.error('Erro ao adicionar token:', error)
    return config
  }
}

export const refreshTokenInterceptor = async (error: any) => {
  const supabase = getBrowserClient()

  if (error.response?.status === 401) {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session) {
        // Tentar refresh do token
        const { data, error: refreshError } = await supabase.auth.refreshSession()
        
        if (refreshError) throw refreshError

        // Retentar requisição original com novo token
        if (error.config && data.session) {
          error.config.headers['Authorization'] = `Bearer ${data.session.access_token}`
          return axios(error.config)
        }
      }
    } catch (refreshError) {
      console.error('Erro ao atualizar token:', refreshError)
      // Redirecionar para login ou limpar sessão
    }
  }

  return Promise.reject(error)
} 