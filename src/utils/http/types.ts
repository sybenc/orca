export interface Res<T> {
  code: number
  data: T
  status: AllowHttpStatus
  message: string
  reference?: string
}

export type AllowHttpStatus = 200 | 400 | 401 | 403 | 404 | 500