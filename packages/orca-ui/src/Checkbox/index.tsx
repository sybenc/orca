import { Checkbox, CheckboxProps } from '@mui/material'
import { FC, ReactNode } from 'react'

interface ICheckboxProps extends CheckboxProps {
  children?: ReactNode;
}

const OrcaCheckbox: FC<ICheckboxProps> = ({ children, ...other }) => {
  return (
    <Checkbox {...other}>{children}</Checkbox>
  )
}

export default OrcaCheckbox