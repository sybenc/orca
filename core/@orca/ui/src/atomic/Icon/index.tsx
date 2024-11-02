import * as icons from '@mui/icons-material'
import { SvgIconComponent } from '@mui/icons-material'
import { SvgIconProps } from '@mui/material'
import { FC } from 'react'
import iconConf from './conf.ts'

const iconsMap = icons as { [key: string]: SvgIconComponent }

export interface IIconProps extends SvgIconProps {
  name: string | undefined
}


const OrcaIcon: FC<IIconProps> = ({ name, fontSize = 'medium', ...other }) => {
  const IconComponent = iconsMap[name as string]
  return IconComponent
    ? <IconComponent  {...other} fontSize={fontSize} sx={{
      ...(fontSize === 'small' && {
        '&.MuiSvgIcon-fontSizeSmall': {
          fontSize: iconConf.size.small
        }
      }),
      ...(fontSize === 'medium' && {
        '&.MuiSvgIcon-fontSizeMedium': {
          fontSize: iconConf.size.medium
        }
      }),
      ...(fontSize === 'large' && {
        '&.MuiSvgIcon-fontSizeLarge': {
          fontSize: iconConf.size.large
        }
      })
    }} />
    : null
}

export default OrcaIcon