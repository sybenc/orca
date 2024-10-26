import { ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material'
import { alpha } from '@mui/material/styles'
import Icon from '../../../components/Icon.tsx'
import { NavLink } from 'react-router-dom'
import { Menu } from '../../../models'

interface IMenuListItemProps {
  activePath: string[] | undefined
  menu: Menu
  handleClickMenuItem: (menu: Menu) => void
}

const OrcaMenuListItem = ({ activePath, menu, handleClickMenuItem }: IMenuListItemProps) => {
  const theme = useTheme()

  return (
    <NavLink to={menu.route!} style={{ textDecoration: 'none' }}>
      <ListItemButton
        onClick={() => {
          handleClickMenuItem(menu)
        }}
        sx={{
          paddingX: '8px',
          marginBottom: '4px',
          height: '32px',
          transition: 'none',
          borderRadius: '3px',
          transitionDuration: '0.1s',
          transitionProperty: 'all',
          transitionTimingFunction: 'linear',
          backgroundColor: activePath?.includes(menu.menuId) ? alpha(theme.palette.primary.main, 0.9) : 'transparent',
          '&:hover': {
            backgroundColor: activePath?.includes(menu.menuId) ? alpha(theme.palette.primary.main, 0.9) : '',
            borderRadius: '3px'
          }
        }}>
        <ListItemIcon sx={{
          minWidth: '28px',
          paddingLeft: `${menu.layer * 16}px`,
          color: activePath?.includes(menu.menuId) ? 'white' : 'textPrimary'
        }}>
          <Icon name={menu.iconName} fontSize="small" />
        </ListItemIcon>
        <ListItemText
          primary={menu.label}
          primaryTypographyProps={{
            color: activePath?.includes(menu.menuId) ? 'white' : 'textPrimary',
            fontSize: 14,
            letterSpacing: 0
          }} />
      </ListItemButton>
    </NavLink>
  )
}

export default OrcaMenuListItem