import { useState } from 'react'
import { Collapse, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { CollapseProps } from '@mui/material/Collapse/Collapse'
import Wrapper from './Wrapper.tsx'
import SendIcon from '@mui/icons-material/Send'
import { ExpandLess, ExpandMore } from '@mui/icons-material'

interface IListDirectoryProps extends CollapseProps {
  label: string
}

export default function ListDirectory(props: IListDirectoryProps) {
  const [open, setOpen] = useState(false)

  return (
    <Wrapper>
      <ListItemButton onClick={() => setOpen(!open)}>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary={props.label} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse
        {...props}
        in={open}>
        {props.children}
      </Collapse>
    </Wrapper>
  )
}