import axios, { AxiosRequestConfig } from 'axios'
import { Res } from './types.ts'
import setupInterceptors from './interceptors.ts'

export const Timeout = 12000

export function CreateAxios(config: AxiosRequestConfig = {}) {
  const defaultConfig: AxiosRequestConfig = {
    baseURL: 'http://localhost:8080',
    timeout: Timeout
  }

  const service = axios.create({
    ...defaultConfig,
    ...config
  })
  setupInterceptors(service)
  return service
}

const http = CreateAxios()

export default {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<Res<T>> {
    return http.get<Res<T>>(url, config) as never
  },
  post<T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<Res<T>> {
    return http.post<Res<T>>(url, data, config) as never
  },
  put<T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<Res<T>> {
    return http.post<Res<T>>(url, data, config) as never
  },
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<Res<T>> {
    return http.delete<Res<T>>(url, config) as never
  },
  upload<T>(url: string, file: File | Blob, config?: AxiosRequestConfig): Promise<Res<T>> {
    const formData = new FormData()
    formData.append('file', file)

    const uploadConfig: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...(config?.headers || {})
      }
    }

    return http.post(url, formData, uploadConfig)
  }
}
