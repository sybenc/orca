import { FC, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { Box, IBoxProps } from '@orca/ui'

export interface IXAxisProps extends IBoxProps {
  width: number
  scale?: number
  tickColor?: string
  textColor?: string
  axisShow?: boolean
  labelShow?: boolean
  labelSuffix?: string
  backgroundColor?: string
}

const XRuler: FC<IXAxisProps> = (props) => {
  const {
    scale = 1,
    width,
    tickColor = '#5F6369',
    textColor = '#5F6369',
    axisShow = false,
    labelShow = true,
    labelSuffix = '',
    backgroundColor = '#F3F4F6',
    ...other
  } = props

  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    if (!svgRef.current) return
    const minTickSpacing = 10
    const tickSpacing = minTickSpacing * scale
    const tickCount = Math.ceil(width / tickSpacing)
    const g = d3.select(svgRef.current)
    const axis = d3.axisBottom(d3.scaleLinear().domain([0, 100]).range([0, width]))
      .ticks(tickCount)

    g.call(axis)
      .selectAll('path, line')
      .attr('stroke', tickColor)
      .attr('transform', 'translate(0.5, 0.5)')

    g.selectAll('.tick text')
      .each(function(datum) {
        d3.select(this).text(datum!.toString().split('').filter(item => item !== ',').join('') + labelSuffix)
      })
      .attr('color', textColor)
      .attr('transform', (datum) => {
        const digit = datum!.toString().length
        return `translate(${10 + digit * 3}, -1.5)`
      })
      .attr('font-size', 10)
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

  }, [scale, width, tickColor, textColor, axisShow, labelShow, labelSuffix])

  return (
    <Box sx={{ backgroundColor, height: 18 }} {...other}>
      <svg height={18} width={width + 50}>
        <g ref={svgRef} transform="translate(18,0)" />
      </svg>
    </Box>
  )
}

export default XRuler