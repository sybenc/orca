import { forwardRef, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { Box, IBoxProps } from '@orca/ui'

export interface IGridCanvasProps extends IBoxProps {
  width: number
  height: number
  show: boolean
  transform?: d3.ZoomTransform
  spacingX?: number
  spacingY?: number
}

const GridCanvas = forwardRef<unknown, IGridCanvasProps>((props, ref) => {
  const { width, height, spacingX = 8, spacingY = 8, show, transform, ...other } = props
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    if (!svgRef.current) return
    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()
    svg.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', '#FFF')

    if (!show) return

    for (let x = 0; x <= width; x = x + spacingX) {
      svg.append('line')
        .attr('x1', x)
        .attr('y1', 0)
        .attr('x2', x)
        .attr('y2', height)
        .attr('stroke', '#ccc')
        .attr('stroke-width', 0.5)
    }

    for (let y = 0; y <= height; y = y + spacingY) {
      svg.append('line')
        .attr('x1', 0)
        .attr('y1', y)
        .attr('x2', width)
        .attr('y2', y)
        .attr('stroke', '#ccc')
        .attr('stroke-width', 0.5)
    }
    // 应用缩放变换
    if (transform) svg.selectAll('line').attr('transform', transform.toString())
  }, [height, spacingX, spacingY, width, transform, show])

  return (
    <Box ref={ref} {...other}>
      <svg ref={svgRef} width={width} height={height}></svg>
    </Box>
  )
})

export default GridCanvas