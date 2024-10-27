import { Button, ButtonProps, styled } from '@mui/material'
import { FC, ReactNode } from 'react'
import buttonConfig from './config.ts'

interface IButtonProps extends ButtonProps {
  children?: ReactNode
}

const OrcaCustomButton: FC<IButtonProps> = styled(Button)(({ size }) => ({
  ...(size === 'small' && {
    '&.MuiButton-sizeSmall': {
      height: buttonConfig.small
    }
  }),
  ...(size === 'medium' && {
    '&.MuiButton-sizeMedium': {
      height: buttonConfig.medium
    }
  }),
  ...(size === 'large' && {
    '&.MuiButton-sizeLarge': {
      height: buttonConfig.large
    }
  })
}))

const OrcaButton: FC<IButtonProps> = ({ children, ...other }) => {
  return (
    <OrcaCustomButton size="medium" {...other}>{children}</OrcaCustomButton>
  )
}

export default OrcaButton