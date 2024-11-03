import { FC, useEffect, useRef } from 'react'
import { Box, IBoxProps } from '@orca/ui'

export interface IMoveProps extends Omit<IBoxProps, 'position'> {
  onMouseDownBefore?: (e: MouseEvent) => void
  onMouseUpAfter?: () => void
}

export const Movable: FC<IMoveProps> = (props) => {
  const boxRef = useRef<HTMLDivElement>(null)
  const {
    onMouseDownBefore,
    onMouseUpAfter,
    children,
    ...other
  } = props

  useEffect(() => {
    const box = boxRef.current
    const container = box?.parentElement
    if (!box || !container) return

    // 确保容器具有 position: relative
    const containerStyle = window.getComputedStyle(container)
    if (containerStyle.position === 'static') {
      container.style.position = 'relative'
    }

    let startX = 0
    let startY = 0
    let isDragging = false

    const onMouseDown = (e: MouseEvent) => {
      if (onMouseDownBefore) onMouseDownBefore(e)
      isDragging = true
      // 计算鼠标点击位置与元素左上角的偏移
      startX = e.clientX - box.offsetLeft
      startY = e.clientY - box.offsetTop
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return

      // 计算新的位置
      let newLeft = e.clientX - startX
      let newTop = e.clientY - startY
      const stepX = parseInt(container.getAttribute('data-step-x')!)
      const stepY = parseInt(container.getAttribute('data-step-y')!)

      // 按步长调整位置
      newLeft = Math.round(newLeft / stepX) * stepX
      newTop = Math.round(newTop / stepY) * stepY

      // 检查是否存在 `ctrl-move-restrain` 属性
      if (container.hasAttribute('data-ctrl-move-restrain')) {
        // 限制元素在容器范围内
        const maxLeft = container.clientWidth - box.offsetWidth
        const maxTop = container.clientHeight - box.offsetHeight

        newLeft = Math.max(0, Math.min(newLeft, maxLeft))
        newTop = Math.max(0, Math.min(newTop, maxTop))
      }


      box.style.left = `${newLeft}px`
      box.style.top = `${newTop}px`
    }

    const onMouseUp = () => {
      if (onMouseUpAfter) onMouseUpAfter()
      isDragging = false
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    box.addEventListener('mousedown', onMouseDown)
    return () => {
      box.removeEventListener('mousedown', onMouseDown)
    }
  }, [onMouseDownBefore, onMouseUpAfter])

  return (
    <Box
      {...other}
      ref={boxRef}
      position="absolute"
      sx={{ cursor: 'move' }}
    >
      {children}
    </Box>
  )
}