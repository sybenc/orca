import { FC, useEffect, useRef } from 'react'
import * as d3 from 'd3'

interface IXAxisProps {
  scale: d3.ScaleLinear<number, number>;
  width: number;
  tickColor?: string;
  textColor?: string;
  axisShow?: boolean;
  labelShow?: boolean;
}

const XRuler: FC<IXAxisProps> = (props) => {
  const { scale, width, tickColor = '#5F6369', textColor = '#5F6369', axisShow = true, labelShow = true } = props
  const ref = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    if (!ref.current) return
    const g = d3.select(ref.current)
    const axis = d3.axisBottom(scale).ticks(100)

    g.insert('rect', ':first-child')
      .attr('x', -20)
      .attr('y', 0)
      .attr('width', width)
      .attr('height', 16)
      .attr('fill', '#F3F4F6')

    g.call(axis)
      .selectAll('path, line')
      .attr('stroke', tickColor)

    g.selectAll('.tick text')
      .attr('color', textColor)
      .attr('transform', (datum) => {
        const digit = datum!.toString().length
        switch (digit) {
          case 1:
            return 'translate(6, -2)'
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

    g.selectAll('.tick line')
      .attr('y2', (_, index) => {
        if (index % 10 === 0) return 11
        if (index % 10 !== 0 && index % 5 === 0) return 8
        return 5
      })

    g.select('.domain').style('display', axisShow ? 'block' : 'none')

  }, [scale, width, tickColor, textColor, axisShow])

  return <g ref={ref} transform="translate(20,0)" />
}

export default XRuler