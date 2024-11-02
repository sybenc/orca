import { Grid2, Grid2Props } from '@mui/material'
import { FC, ReactNode } from 'react'

export interface IGridProps extends Grid2Props {
  children?: ReactNode
}

const OrcaGrid2: FC<IGridProps> = ({ children, ...other }) => {
  return <Grid2 {...other}>{children}</Grid2>
}

export default OrcaGrid2