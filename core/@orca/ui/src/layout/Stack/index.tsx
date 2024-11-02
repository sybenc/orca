import { Stack, StackProps } from '@mui/material'
import { FC, ReactNode } from 'react'

export interface IStackProps extends StackProps {
  children?: ReactNode
}

const OrcaStack: FC<IStackProps> = ({ children, ...other }) => {
  return <Stack {...other}>{children}</Stack>
}

export default OrcaStack