import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './assets/reset.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './store/store.ts'
import { createTheme, ThemeProvider } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',      // 设置主色
      light: '#42a5f5',     // 设置浅色
      dark: '#1565c0',      // 设置深色
      contrastText: '#fff'  // 设置文字对比色
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,      // 禁用点击涟漪效果
      },
    },
    MuiListItemButton: {
      defaultProps: {
        disableRipple: true,      // 禁用点击涟漪效果
      },
    }
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </StrictMode>
)
