import { LinearProgress, LinearProgressProps } from '@mui/material'
import { FC } from 'react'

export type ILinearProgressProps = LinearProgressProps

const OrcaLinearProgress: FC<ILinearProgressProps> = ({...other }) => {
  return <LinearProgress {...other}/>
}

export default OrcaLinearProgress