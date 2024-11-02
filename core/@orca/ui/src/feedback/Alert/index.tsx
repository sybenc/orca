import { Alert, AlertProps } from '@mui/material'
import { forwardRef, ReactNode } from 'react'

export interface IAlertProps extends AlertProps {
  children?: ReactNode;
}

const OrcaAlert = forwardRef<HTMLDivElement, IAlertProps>(({ children, ...other }, ref) => {
  return (
    <Alert ref={ref} {...other}>
      {children}
    </Alert>
  )
})

export default OrcaAlert