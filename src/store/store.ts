import { combineReducers, configureStore } from '@reduxjs/toolkit'
import menuReducer from './menu.ts'


export const rootReducer = combineReducers({
  menu: menuReducer
})

const store = configureStore({
  reducer: rootReducer
})

export type AppStore = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch
export default store