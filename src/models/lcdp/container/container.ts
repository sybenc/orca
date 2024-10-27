import { SxProps, Theme } from '@mui/material'

export type LayoutType = 'absolute' | 'flex' | 'grid' | 'fixed'

export interface LcdpContainer {
  layoutType: LayoutType
  padding: SxProps
}