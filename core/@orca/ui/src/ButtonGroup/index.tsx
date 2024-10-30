import { ButtonGroup, ButtonGroupProps } from '@mui/material'
import { FC, ReactNode } from 'react'

interface IButtonGroupProps extends ButtonGroupProps {
  children?: ReactNode
}

const OrcaButtonGroup: FC<IButtonGroupProps> = ({ children, ...other }) => {
  return (
    <ButtonGroup {...other}>{children}</ButtonGroup>
  )
}

export default OrcaButtonGroup