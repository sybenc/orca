import { Box, BoxProps } from '@mui/material'
import { FC, ReactNode } from 'react'

export interface IBoxProps extends BoxProps {
  children?: ReactNode
}

const OrcaBox: FC<IBoxProps> = ({ children, ...other }) => {
  return <Box {...other}>{children}</Box>
}

export default OrcaBox