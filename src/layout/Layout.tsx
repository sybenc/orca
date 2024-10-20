import { ReactNode, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppStore, getMenuList } from '../store'
import { Menu, menuListToTree } from '../models'
import { NavLink, useLocation } from 'react-router-dom'
import { Box, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import ListDirectory from '../components/ListDirectory.tsx'

const NotAllowShowMenu = ['/404', '/500']

interface ILayoutProps {
  children?: ReactNode
}

export default function Layout({ children }: ILayoutProps) {
  const dispatch = useDispatch<AppDispatch>()
  const { loading, menuList } = useSelector((state: AppStore) => state.menu)
  const location = useLocation()

  useEffect(() => {
    dispatch(getMenuList())
  }, [dispatch])

  function getNodeFormTree(tree: Menu) {
    if (!tree.children || tree.children.length === 0) {
      return (
        <NavLink to={tree.route!} key={tree.menuId}>
          <ListItemButton>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary={tree.label} />
          </ListItemButton>
        </NavLink>
      )
    }
    return (
      <ListDirectory sx={{ pl: 4 }} key={tree.menuId} label={tree.label}>
        <List
          component="div"
          disablePadding>
          {
            tree.children.map((item) => getNodeFormTree(item))
          }
        </List>
      </ListDirectory>
    )
  }

  function getMenuNode(list: Menu[]) {
    const result = []
    for (const menu of menuListToTree(list)) {
      result.push(getNodeFormTree(menu))
    }
    return (
      <List>{result}</List>
    )
  }

  return (
    <Box sx={{ position: 'absolute', display: 'flex', width: '100vw', height: '100vh', inset: 0 }}>
      <Box sx={{ width: '220px', inset: 0, borderRight: '1px solid black' }}>
        <Box sx={{ height: '40px', backgroundColor: 'skyblue', borderBottom: '1px solid black' }}>

        </Box>
        <Box sx={{ flex: 1, paddingX: '8px' }}>
          {
            !NotAllowShowMenu.includes(location.pathname) && loading
              ? <div>加载中</div>
              : getMenuNode(menuList)
          }
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', inset: 0 }}>
        <Box sx={{ height: '40px', backgroundColor: 'skyblue', borderBottom: '1px solid black' }}>

        </Box>
        <Box sx={{ flex: 1}}>
          {children}
        </Box>
      </Box>
    </Box>
  )
}