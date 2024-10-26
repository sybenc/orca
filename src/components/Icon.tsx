import * as icons from '@mui/icons-material'
import { SvgIconComponent } from '@mui/icons-material'
import { SvgIconProps } from '@mui/material'

const iconsMap = icons as { [key: string]: SvgIconComponent }

interface IIconProps extends SvgIconProps {
  name: string | undefined
}

const Icon = ({ name, ...MuiSvgIconProps }: IIconProps) => {
  const IconComponent = iconsMap[name as string]
  return IconComponent ? <IconComponent {...MuiSvgIconProps} /> : null
}

export default Icon