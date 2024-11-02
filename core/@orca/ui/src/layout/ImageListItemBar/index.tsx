import { ImageListItemBar, ImageListItemBarProps } from '@mui/material'
import { FC } from 'react'

export type IImageListItemBarProps = ImageListItemBarProps

const OrcaImageListItemBar: FC<IImageListItemBarProps> = ({ children, ...other }) => {
  return <ImageListItemBar {...other}>{children}</ImageListItemBar>
}

export default OrcaImageListItemBar