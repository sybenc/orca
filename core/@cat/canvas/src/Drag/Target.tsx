import { Box, IBoxProps } from '@orca/ui'
import { DragEvent, FC, useRef } from 'react'

export interface ITargetProps extends IBoxProps {
  acceptKey: string
  onDropEnd?: (data: string, position: { x: number, y: number }) => void
}

export const Target: FC<ITargetProps> = (props) => {
  const { acceptKey, children, onDropEnd, ...other } = props
  const targetRef = useRef<HTMLDivElement | null>(null)
  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const data = event.dataTransfer.getData(acceptKey)
    if (targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect()
      const position = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      }
      if (onDropEnd) onDropEnd(data, position)
    }
  }
  return (
    <Box
      {...other}
      ref={targetRef}
      onDragOver={handleDragOver}
      onDrop={handleDrop}>
      {children}
    </Box>
  )
}
