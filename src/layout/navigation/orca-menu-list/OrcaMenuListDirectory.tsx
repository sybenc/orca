import { useState } from 'react'
import { Collapse, ListItemButton, ListItemIcon, ListItemText, styled } from '@mui/material'
import { CollapseProps } from '@mui/material/Collapse/Collapse'
import { Menu } from '../../../models'
import Wrapper from '../../../components/Wrapper.tsx'
import Icon from '../../../components/Icon.tsx'

interface IListDirectoryProps extends CollapseProps {
  menu: Menu
  activePath: string[]
}

export default function OrcaMenuListDirectory(props: IListDirectoryProps) {
  const [open, setOpen] = useState(false)
  const { menu, activePath, ...collapseProps } = props

  const MenuListDirectoryIcon = styled(Icon)(({ theme }) => ({
    color: activePath?.includes(menu.menuId) ? theme.palette.primary.main : 'textPrimary'
  }))

  return (
    <Wrapper>
      <ListItemButton
        onClick={() => setOpen(!open)}
        sx={{
          marginBottom: '4px',
          paddingX: '8px',
          height: '32px',
          borderRadius: '3px'
        }}>
        <ListItemIcon sx={{
          minWidth: '28px',
          paddingLeft: `${menu.layer * 16}px`
        }}>
          <MenuListDirectoryIcon name={menu.iconName} fontSize="small" />
        </ListItemIcon>
        <ListItemText
          primary={menu.label}
          primaryTypographyProps={{
            color: activePath?.includes(menu.menuId) ? 'primary.main' : 'textPrimary',
            fontSize: 14,
            letterSpacing: 0
          }} />
        {open
          ? <MenuListDirectoryIcon name="ExpandLess" fontSize="small" />
          : <MenuListDirectoryIcon name="ExpandMore" fontSize="small" />}
      </ListItemButton>
      <Collapse
        {...collapseProps}
        in={open}>
        {props.children}
      </Collapse>
    </Wrapper>
  )
}