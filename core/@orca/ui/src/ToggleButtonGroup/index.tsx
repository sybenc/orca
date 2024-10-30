import { ToggleButtonGroup, ToggleButtonGroupProps } from '@mui/material'
import { FC, ReactNode } from 'react'
import toggleButtonConf from '../ToggleButton/conf.ts'

interface IToggleButtonGroupProps extends ToggleButtonGroupProps {
  children?: ReactNode
}

const OrcaToggleButtonGroup: FC<IToggleButtonGroupProps> = ({ children, size = 'medium', ...other }) => {
  return (
    <ToggleButtonGroup size={size} sx={{
      ...(size === 'small' && {
        height: toggleButtonConf.height.small

      }),
      ...(size === 'medium' && {
        height: toggleButtonConf.height.medium
      }),
      ...(size === 'large' && {
        height: toggleButtonConf.height.large
      })
    }} {...other}>{children}</ToggleButtonGroup>
  )
}

export default OrcaToggleButtonGroup