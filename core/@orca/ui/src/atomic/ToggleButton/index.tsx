import { styled, ToggleButton, ToggleButtonProps } from '@mui/material'
import { FC, ReactNode } from 'react'
import toggleButtonConf from './conf.ts'


export interface IToggleButtonProps extends ToggleButtonProps {
  children?: ReactNode
}

const OrcaCustomToggleButton: FC<IToggleButtonProps> = styled(ToggleButton)(({ size = 'inherit' }) => ({
  ...(size === 'small' && {
    '&.MuiToggleButton-sizeSmall': {
      height: toggleButtonConf.height.small,
      padding: toggleButtonConf.padding.small,
    }
  }),
  ...(size === 'medium' && {
    '&.MuiToggleButton-sizeMedium': {
      height: toggleButtonConf.height.medium,
      padding: toggleButtonConf.padding.medium,
    }
  }),
  ...(size === 'large' && {
    '&.MuiToggleButton-sizeLarge': {
      height: toggleButtonConf.height.large,
      padding: toggleButtonConf.padding.large,
    }
  })
}))

const OrcaRadioGroup: FC<IToggleButtonProps> = ({ children, ...other }) => {
  return (
    <OrcaCustomToggleButton {...other}>{children}</OrcaCustomToggleButton>
  )
}

export default OrcaRadioGroup