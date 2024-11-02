import { Button, ButtonProps, styled } from '@mui/material'
import { FC, ReactNode } from 'react'
import buttonConf from './conf.ts'

export interface IButtonProps extends ButtonProps {
  children?: ReactNode
}

const OrcaCustomButton: FC<IButtonProps> = styled(Button)(({ size }) => ({
  ...(size === 'small' && {
    '&.MuiButton-sizeSmall': {
      height: buttonConf.height.small,
      padding: buttonConf.padding.small,
    }
  }),
  ...(size === 'medium' && {
    '&.MuiButton-sizeMedium': {
      height: buttonConf.height.medium,
      padding: buttonConf.padding.medium,
    }
  }),
  ...(size === 'large' && {
    '&.MuiButton-sizeLarge': {
      height: buttonConf.height.large,
      padding: buttonConf.padding.large,
    }
  })
}))

const OrcaButton: FC<IButtonProps> = ({ children, ...other }) => {
  return (
    <OrcaCustomButton size="medium" {...other}>{children}</OrcaCustomButton>
  )
}

export default OrcaButton