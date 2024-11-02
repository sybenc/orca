import { Box, IBoxProps } from '@orca/ui'
import { DragEvent, useRef, FC } from 'react'

export interface ISourceProps extends IBoxProps {
  sendKey: string
  data: string
}

export const Source: FC<ISourceProps> = (props) => {
  const { sendKey, data, children, ...other } = props
  const dragImageRef = useRef<HTMLDivElement | null>(null)

  const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer!.setData(sendKey, data)
    // 创建当前元素的克隆，用于拖拽图像
    const dragImage = event.currentTarget.cloneNode(true) as HTMLDivElement
    dragImage.style.position = 'absolute'
    dragImage.style.top = '-9999px' // 将元素移出可视区域
    dragImage.style.opacity = '0.5'
    document.body.appendChild(dragImage)

    event.dataTransfer.setDragImage(dragImage, 0, 0)
    dragImageRef.current = dragImage
  }

  const handleDragEnd = () => {
    // 清理克隆的元素
    if (dragImageRef.current) {
      document.body.removeChild(dragImageRef.current)
      dragImageRef.current = null
    }
  }
  return (
    <Box draggable
         {...other}
         ref={dragImageRef}
         onDragStart={handleDragStart}
         onDragEnd={handleDragEnd}
         sx={{ cursor: 'pointer' }}>
      {children}
    </Box>
  )
}
