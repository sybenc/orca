import { Box, IBoxProps } from '@orca/ui'
import { DragEvent, FC, useRef } from 'react'

export interface ITargetProps extends IBoxProps {
  acceptKey: string
  onDragMaterialEnd?: (data: string, position: { x: number, y: number }) => void
  onDragMaterialOver?: (event: DragEvent<HTMLDivElement>) => void
}

export const Target: FC<ITargetProps> = (props) => {
  const { acceptKey, children, onDragMaterialEnd, onDragMaterialOver, ...other } = props
  const targetRef = useRef<HTMLDivElement | null>(null)
  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    if (onDragMaterialOver) onDragMaterialOver(event)
  }
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()

    const data = event.dataTransfer.getData(acceptKey)
    if (targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect()
      const position = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      }
      if (onDragMaterialEnd) onDragMaterialEnd(data, position)
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
