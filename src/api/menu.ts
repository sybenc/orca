import http from '../utils/http/http.ts'
import { Res } from '../utils/http'
import { Menu, MenuList, MenuTypeEnum } from '../models'

export interface MenuListParams {
  label: string
  code: string
  type?: MenuTypeEnum
  status?: boolean
  show?: boolean
}

export default {
  get: (id: number): Promise<Res<Menu>> => http.get(`/menu/${id}`) ,
  create: (body: Menu): Promise<Res<string>> => http.post(`/menu`, body) ,
  list: (params?: MenuListParams): Promise<Res<MenuList>> => http.get(`/menu`, { params })
}