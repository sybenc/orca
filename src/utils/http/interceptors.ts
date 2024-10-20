import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { Res } from './types.ts'


export default function setupInterceptors(axiosInstance: AxiosInstance) {
  function reqResolve(config: AxiosRequestConfig): AxiosRequestConfig {
    const token = sessionStorage.getItem('token')
    if (token) {
      config.headers!.Authorization = `Bearer ${token}`  // Add the token to the Authorization header
    }
    return config
  }

  function reqReject(error: Error): Promise<Error> {
    return Promise.reject(new Error('Request failed: ' + error.message))
  }

  function resResolve<T>(response: AxiosResponse<Res<T>>): Promise<Res<T> | AxiosResponse> {
    const { status, headers, data } = response
    if (headers['Content-Type'] === 'application/json') {
      if (status === 200) {
        return Promise.resolve(data)
      }
      return Promise.reject(new Error('Response failed'))
    }
    return Promise.resolve(response)
  }

  function resReject(error: Error): Promise<Error> {
    return Promise.reject(error)
  }


  axiosInstance.interceptors.request.use(reqResolve as never, reqReject)
  axiosInstance.interceptors.response.use(resResolve as never, resReject)
}