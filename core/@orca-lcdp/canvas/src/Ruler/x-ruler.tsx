import { FC, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { Box } from '@orca/ui'

interface IXAxisProps {
  width: number
  scale?: number
  tickColor?: string
  textColor?: string
  axisShow?: boolean
  labelShow?: boolean
  backgroundColor?: string

  [key: string]: unknown

}

const XRuler: FC<IXAxisProps> = ({
                                   scale = 1,
                                   width,
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
    const tickCount = Math.ceil(width / tickSpacing)
    const g = d3.select(ref.current)
    const axis = d3.axisBottom(d3.scaleLinear().domain([0, width]).range([0, width]))
      .ticks(tickCount)

    g.call(axis)
      .selectAll('path, line')
      .attr('stroke', tickColor)
      .attr('transform', 'translate(0.5, 0.5)')

    g.selectAll('.tick text')
      .each(function(datum) {
        d3.select(this).text(datum!.toString().split('').filter(item => item !== ',').join(''))
      })
      .attr('color', textColor)
      .attr('transform', (datum) => {
        const digit = datum!.toString().length
        switch (digit) {
          case 1:
            return 'translate(8, -2)'
          case 2:
            return 'translate(9, -2)'
          case 3:
            return 'translate(12, -2)'
          case 4:
            return 'translate(14, -2)'
          default:
            return ''
        }
      })
      .attr('font-size', 8)
      .style('display', (_, index) => labelShow && index % 10 === 0 ? 'block' : 'none')
      .style('cursor', 'default')

    g.selectAll('.tick line')
      .attr('transform', 'translate(0.5, 0.5)')
      .attr('y2', (_, index) => {
        if (index % 10 === 0) return 11
        if (index % 10 !== 0 && index % 5 === 0) return 8
        return 5
      })


    g.select('.domain').style('display', axisShow ? 'block' : 'none')

  }, [scale, width, tickColor, textColor, axisShow, labelShow])

  return (
    <Box sx={{ backgroundColor, height: 16 }} {...other}>
      <svg height={16} width={width + 50}>
        <g ref={ref} transform="translate(16,0)" />
      </svg>
    </Box>
  )
}

export default XRuler