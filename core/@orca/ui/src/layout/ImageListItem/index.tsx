import { ImageListItem, ImageListItemProps } from '@mui/material'
import { FC } from 'react'

export type IImageListItemProps = ImageListItemProps

const OrcaImageListItem: FC<IImageListItemProps> = ({ children, ...other }) => {
  return <ImageListItem {...other}>{children}</ImageListItem>
}

export default OrcaImageListItem