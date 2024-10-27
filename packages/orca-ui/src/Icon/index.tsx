import * as icons from '@mui/icons-material'
import { SvgIconComponent } from '@mui/icons-material'
import { SvgIconProps } from '@mui/material'
import { FC } from 'react'

const iconsMap = icons as { [key: string]: SvgIconComponent }

interface IIconProps extends SvgIconProps {
  name: string | undefined
}

const OrcaIcon: FC<IIconProps> = ({ name, ...other }) => {
  const IconComponent = iconsMap[name as string]
  return IconComponent ? <IconComponent {...other} /> : null
}

export default OrcaIcon