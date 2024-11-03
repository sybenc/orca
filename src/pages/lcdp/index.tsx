import { Box } from '@orca/ui'
import { Canvas, Drag, XRuler, YRuler } from '@cat/canvas'
import { Queue } from '@squirrel/queue'
import { useEffect, useRef, useState } from 'react'
const LCDP = () => {
  const queue = new Queue<number>()
  queue.enqueue(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
  const scale = 1
  const canvasRef = useRef<SVGSVGElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [relationPosition, setRelationPosition] = useState<{ x: number, y: number }>({ x: 18, y: 18 })

  useEffect(() => {
    if (!(canvasRef.current && containerRef.current)) return
    const canvasRect = canvasRef.current.getBoundingClientRect()
    const containerRect = containerRef.current.getBoundingClientRect()

    setRelationPosition({
      ...relationPosition,
      x: canvasRect.x > containerRect.x ? canvasRect.x - containerRect.x : 0,
      y: canvasRect.y > containerRect.y ? canvasRect.y - containerRect.y : 0
    })

  }, [])

  return (
    <div>
      <Box ref={containerRef} position="absolute" width="1050px" height="900px"
           sx={{ backgroundColor: '#F3F4F6', overflow: 'auto' }}>
        <XRuler
          position="sticky"
          top="0"
          left="0"
          scale={scale}
          zIndex={101}
          offset={relationPosition.x}
          width={992}
          labelSuffix="%"
        />
        <YRuler
          position="sticky"
          top="0"
          left="0"
          scale={scale}
          zIndex={100}
          offset={relationPosition.y}
          height={1000}
        />
        <Drag.Target
          position="absolute"
          top={35}
          left={35}
          zIndex={1}
          sx={{ transformOrigin: '0 0', transform: `scale(${scale})` }}
          acceptKey={'materialKey'}
          onDragMaterialEnd={(data, position) => console.log(data, position)}>
          <Canvas.Grid
            ref={canvasRef}
            show={false}
            width={992}
            height={777}
            spacingX={50}
            spacingY={10}
          />
        </Drag.Target>
      </Box>
    </div>
  )
}

export default LCDP