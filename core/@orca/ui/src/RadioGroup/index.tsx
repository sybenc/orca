import { RadioGroup, RadioGroupProps } from '@mui/material'
import { FC, ReactNode } from 'react'


interface IRadioGroupProps extends RadioGroupProps {
  children?: ReactNode
}

const OrcaRadioGroup: FC<IRadioGroupProps> = ({ children, ...other }) => {
  return (
    <RadioGroup {...other}>{children}</RadioGroup>
  )
}

export default OrcaRadioGroup