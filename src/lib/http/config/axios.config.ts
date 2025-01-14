import axios from 'axios'
import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { authInterceptor, refreshTokenInterceptor } from '../interceptors/auth.interceptor'

// Configuração base do Axios
const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// Interceptor de Request - Adiciona token
api.interceptors.request.use(authInterceptor)

// Interceptor de Response - Refresh token e tratamento de erros
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  refreshTokenInterceptor
)

export { api } 