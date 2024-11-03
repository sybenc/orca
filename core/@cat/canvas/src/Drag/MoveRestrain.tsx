import { FC } from 'react'
import { Box, IBoxProps } from '@orca/ui'

export interface IMoveRestrainProps extends IBoxProps {
  stepX?: number
  stepY?: number
}

export const MoveRestrain: FC<IMoveRestrainProps> = (props) => {
  const {
    stepX = 50,
    stepY = 10
  } = props
  return (
    <Box
      {...props}
      data-ctrl-move-restrain
      data-step-x={stepX}
      data-step-y={stepY}
    >
      {props.children}
    </Box>
  )
}