import { Box, BoxProps } from '@mui/material'
import { forwardRef, ReactNode } from 'react'

export interface IBoxProps extends BoxProps {
  children?: ReactNode
}

const OrcaBox = forwardRef<unknown, IBoxProps>(({ children, ...other }, ref) => {
  return (
    <Box {...other} ref={ref}>
      {children}
    </Box>
  )
})

export default OrcaBox