import { FC, useMemo } from 'react'
import * as d3 from 'd3'
import XRuler from './x-ruler.tsx'

const Ruler: FC = () => {
  const innerWidth = 1200
  const xScale = useMemo(
    () => d3.scaleLinear().domain([0, innerWidth]).range([0, innerWidth]),
    [innerWidth])

  return (
    <div>
      <svg style={{ paddingLeft: 10 }} height={240} width={1250}>
        <XRuler scale={xScale} width={innerWidth + 50} axisShow={false}></XRuler>
      </svg>
    </div>
  )
}

export default Ruler