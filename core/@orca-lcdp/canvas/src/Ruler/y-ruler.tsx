import { FC, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { Box } from '@orca/ui'

interface IYAxisProps {
  height: number
  scale?: number
  tickColor?: string
  textColor?: string
  axisShow?: boolean
  labelShow?: boolean
  backgroundColor?: string

  [key: string]: unknown
}

const YRuler: FC<IYAxisProps> = ({
                                   scale = 1,
                                   height,
                                   tickColor = '#5F6369',
                                   textColor = '#5F6369',
                                   axisShow = false,
                                   labelShow = true,
                                   backgroundColor = '#F3F4F6',
                                   ...other
                                 }) => {
  const ref = useRef<SVGSVGElement | null>(null)
  useEffect(() => {
    if (!ref.current) return

    const minTickSpacing = 10
    const tickSpacing = minTickSpacing * scale
    const tickCount = Math.ceil(height / tickSpacing)
    const g = d3.select(ref.current)
    const axis = d3.axisLeft(d3.scaleLinear().domain([0, height]).range([0, height]))
      .ticks(tickCount)

    g.call(axis)
      .selectAll('path, line')
      .attr('stroke', tickColor)
      .attr('transform', 'translate(0.5, 0.5)')

    g.selectAll('.tick text')
      .attr('transform', 'translate(21,4)')
      .attr('color', textColor)
      .attr('font-size', 8)
      .style('display', (_, index) => labelShow && index % 10 === 0 ? 'block' : 'none')
      .style('cursor', 'default')
      .each(function() {
        const textNode = d3.select(this)
        const textContent = textNode.text().split('').filter(item => item !== ',').join('') // 获取文本内容
        textNode.text('') // 清空原始文本
        textContent.split('').forEach((char) => {
          textNode.append('tspan')
            .attr('x', -9)
            .attr('dy', '1em')
            .text(char)
        })
      })


    g.selectAll('.tick line')
      .attr('transform', 'translate(0.5, 0.5)')
      .attr('x1', (_, index) => {
        if (index % 10 === 0) return 11
        if (index % 10 !== 0 && index % 5 === 0) return 8
        return 5
      })

    g.select('.domain').style('display', axisShow ? 'block' : 'none')

  }, [scale, height, tickColor, textColor, axisShow, labelShow])

  return (
    <Box sx={{ backgroundColor, width: 16 }} {...other}>
      <svg width={16} height={height + 50}>
        <g ref={ref} transform="translate(0,16)"></g>
      </svg>
    </Box>
  )
}

export default YRuler