import { forwardRef, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { Box, IBoxProps } from '@orca/ui'

export interface IDotCanvasProps extends IBoxProps {
  width: number
  height: number
  spacingX?: number
  spacingY?: number
  radius?: number
}

const DotCanvas = forwardRef<HTMLDivElement, IDotCanvasProps>((props, ref) => {
  const { width, height, spacingX = 8, spacingY = 8, radius = 1, ...other } = props
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    if (!svgRef.current) return
    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()
    for (let x = spacingX; x < width; x = x + spacingX) {
      for (let y = spacingY; y < height; y = y + spacingY) {
        svg.append('circle')
          .attr('cx', x)
          .attr('cy', y)
          .attr('r', radius)
          .attr('fill', '#ccc')
      }
    }
  }, [height, spacingX, spacingY, width, radius])

  return (
    <Box {...other} ref={ref}>
      <svg ref={svgRef} width={width} height={height}></svg>
    </Box>
  )
})

export default DotCanvas