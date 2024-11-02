import { ImageList, ImageListProps } from '@mui/material'
import { FC } from 'react'

export type IImageListProps = ImageListProps

const OrcaImageList: FC<IImageListProps> = ({ children, ...other }) => {
  return <ImageList {...other}>{children}</ImageList>
}

export default OrcaImageList