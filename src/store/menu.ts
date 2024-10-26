import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../api'
import { Menu } from '../models'

export const getMenuList = createAsyncThunk(
  'menu/getMenuList',
  async () => {
    const res = await api.menu.list()
    return res.data.items
  }
)

interface MenuStoreState {
  menuList: Menu[],
  loading: boolean,
  error: string | null,
}

const initialState: MenuStoreState = {
  menuList: [],
  loading: false,
  error: null
}

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMenuList.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(getMenuList.fulfilled, (state, res) => {
        state.loading = false
        state.menuList = res.payload
      })
      .addCase(getMenuList.rejected, (state, res) => {
        state.loading = false
        state.error = res.error.message ?? null
      })
  }
})


export default menuSlice.reducer