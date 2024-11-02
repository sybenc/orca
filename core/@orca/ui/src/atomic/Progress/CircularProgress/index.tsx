import { CircularProgress, CircularProgressProps } from '@mui/material'
import { FC } from 'react'

export type ICircularProgressProps = CircularProgressProps

const OrcaCircularProgress: FC<ICircularProgressProps> = ({...other }) => {
  return <CircularProgress {...other}/>
}

export default OrcaCircularProgress