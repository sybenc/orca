import { Button } from "@mui/material"
import { FC } from "react"
import { Drag } from '@cat/canvas'

const Home: FC = () => {
  return (
    <Drag.MoveRestrain width={300} height={300} stepX={10} stepY={10} bgcolor='salmon'>
      <Drag.Movable>
        <Button variant="outlined" color="primary">
          你好
        </Button>
      </Drag.Movable>
      <Drag.Movable>
        <Button variant="outlined" color="primary">
          你好
        </Button>
      </Drag.Movable>
    </Drag.MoveRestrain>
  )
}

export default Home
