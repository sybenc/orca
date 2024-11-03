import { FC, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { Box, IBoxProps } from '@orca/ui'
import { SxProps } from '@mui/material'

export interface IXAxisProps extends IBoxProps {
  width: number
  scale?: number
  transform?: d3.ZoomTransform;
  tickColor?: string
  textColor?: string
  axisShow?: boolean
  labelShow?: boolean
  labelSuffix?: string
  offset?: number
  backgroundColor?: string
}

const XRuler: FC<IXAxisProps> = (props) => {
  const {
    transform,
    width,
    scale = 1,
    tickColor = '#5F6369',
    textColor = '#5F6369',
    axisShow = false,
    labelShow = true,
    labelSuffix = '',
    backgroundColor = '#F3F4F6',
    offset = 0,
    ...other
  } = props

  const rulerRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    if (!rulerRef.current) return
    const g = d3.select(rulerRef.current)
    // 定义比例尺并应用缩放变换
    const rulerScale = d3.scaleLinear()
      .domain([-100 * 1.2, 100 * 1.2])
      .range([-width * 1.2 * scale, width * 1.2 * scale])

    // 根据缩放级别调整刻度数量
    const axis = d3.axisBottom(rulerScale).ticks(200 * 1.2)

    g.call(axis)
      .selectAll('path, line')
      .attr('stroke', tickColor)

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
      .attr('y2', (_, index) => {
        if (index % 10 === 0) return 11
        if (index % 10 !== 0 && index % 5 === 0) return 8
        return 5
      })


    g.select('.domain').style('display', axisShow ? 'block' : 'none')
  }, [width, tickColor, textColor, axisShow, labelShow, labelSuffix, transform, offset])

  const boxStyle = {
    backgroundColor,
    height: 18,
    width: width * 1.2 * scale,
    boxSizing: 'border-box',
    borderBottom: '1px solid #E5E5E5'
  } as SxProps

  return (
    <Box sx={boxStyle} {...other}>
      <svg height={18} width="100%">
        <g ref={rulerRef} transform={`translate(${offset},0)`} />
      </svg>
    </Box>
  )
}

export default XRuler