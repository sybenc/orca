import Wrapper from '../../../components/Wrapper.tsx'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppStore, getMenuList } from '../../../store'
import { useEffect, useState } from 'react'
import { CircularProgress, List } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { Menu, menuListToTree } from '../../../models'
import OrcaMenuListItem from './OrcaMenuListItem.tsx'
import OrcaMenuListDirectory from './OrcaMenuListDirectory.tsx'

const NotAllowShowMenu = ['/404', '/500']

const MenuList = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { loading, menuList } = useSelector((state: AppStore) => state.menu)
  const [activePath, setActivePath] = useState<string[]>()
  const location = useLocation()

  useEffect(() => {
    dispatch(getMenuList())
  }, [dispatch])

  useEffect(() => {
    if (menuList.length > 0) setActivePath([menuList[0] ? menuList[0].menuId : ''])
  }, [menuList])

  const handleClickMenuItem = (menu: Menu) => {
    setActivePath(findPath(menu))
  }

  function findPath(menu: Menu, path: string[] = []) {
    path.unshift(menu.menuId)
    if (!menu.parentId) return path

    for (const ml of menuList) {
      if (ml.menuId === menu.parentId) {
        return findPath(ml, path) // 递归查找父菜单
      }
    }
    return path // 未找到父菜单时返回路径
  }

  function getNodeFormTree(menu: Menu) {
    if (!menu.children || menu.children.length === 0) {
      return <OrcaMenuListItem
        key={menu.menuId}
        menu={menu}
        activePath={activePath}
        handleClickMenuItem={() => handleClickMenuItem(menu)} />
    }
    return (
      <OrcaMenuListDirectory
        activePath={activePath ? activePath : []}
        key={menu.menuId}
        menu={menu}>
        <List
          key={menu.menuId}
          component="div"
          disablePadding>
          {
            menu.children.map((item) => getNodeFormTree(item))
          }
        </List>
      </OrcaMenuListDirectory>
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
    <Wrapper>
      {
        !NotAllowShowMenu.includes(location.pathname) && loading
          ? <CircularProgress />
          : getMenuNode(menuList)
      }
    </Wrapper>
  )
}

export default MenuList