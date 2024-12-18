import { forwardRef, Ref, SyntheticEvent, useEffect, useState } from 'react'
import { Menu, menuListToTree } from '../../../../models'
import api from '../../../../api'
import {
  RichTreeView,
  TreeItem2,
  TreeItem2Props,
  UseTreeItem2ContentSlotOwnProps, useTreeItem2Utils
} from '@mui/x-tree-view'
import Wrapper from '../../../../components/Wrapper.tsx'
import { Box, styled, TextField } from '@mui/material'
import { alpha } from '@mui/material/styles'
import Icon from '../../../../components/Icon.tsx'

const CustomContent = styled('div')(({ theme }) => ({
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  '&:hover': {
    backgroundColor: ''
  },
  variants: [
    {
      props: ({ status }: UseTreeItem2ContentSlotOwnProps) => status.selected,
      style: {
        backgroundColor: alpha(theme.palette.primary.main, 0.2),
        color: theme.palette.primary.main
      }
    }
  ]
}))

interface ICustomTreeLabelProps {
  item: Menu
}

const CustomLabel = ({ item }: ICustomTreeLabelProps) => {
  return (
    <Box display="flex" alignItems="center" sx={{ fontSize: '14px' }} gap="8px">
      <Icon name={item.iconName} fontSize="small" />
      {item.label}
    </Box>
  )
}

const CustomTreeItem = forwardRef(function CustomTreeItem(
  props: TreeItem2Props,
  ref: Ref<HTMLLIElement>
) {
  const { publicAPI } = useTreeItem2Utils({
    itemId: props.itemId,
    children: props.children
  })

  const item = publicAPI.getItem(props.itemId)
  return (
    <TreeItem2
      {...props}
      ref={ref}
      slots={{ content: CustomContent, label: CustomLabel }}
      slotProps={{
        label: { item: item } as never
      }}
    />
  )
})

const OrcaMenuTree = () => {
  const [menuTree, setMenuTree] = useState<Menu[]>([])
  const [selectedMenuId, setSelectedMenuId] = useState<string | null>(null)
  console.log(selectedMenuId)
  const [expandedItemIds, setExpandedItemIds] = useState<string[]>([])
  useEffect(() => {
    api.menu.list().then(res => {
      setMenuTree(menuListToTree(res.data.items))
      getDefaultExpanded()
    })
  }, [])

  function getDefaultExpanded() {
    const itemIds: string[] = []
    const registerId = (item: Menu) => {
      if (item.children && item.children.length > 0) {
        itemIds.push(item.menuId)
        item.children.forEach(registerId)
      }
    }

    menuTree.forEach(registerId)
    setExpandedItemIds(itemIds)
  }

  const handleItemSelectionToggle = (
    _: SyntheticEvent,
    itemId: string,
    isSelected: boolean
  ) => {
    if (isSelected) {
      setSelectedMenuId(itemId)
    }
  }

  const handleExpandedItemsChange = (
    _: SyntheticEvent,
    itemIds: string[]
  ) => {
    setExpandedItemIds(itemIds)
  }

  return (
    <Wrapper>
      <TextField></TextField>
      <RichTreeView
        onItemSelectionToggle={handleItemSelectionToggle}
        items={menuTree}
        expandedItems={expandedItemIds}
        onExpandedItemsChange={handleExpandedItemsChange}
        itemChildrenIndentation={16}
        getItemId={(item: Menu) => item.menuId}
        sx={{ height: 'fit-content', flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
        slots={{ item: CustomTreeItem }}
      />
    </Wrapper>
  )
}

export default OrcaMenuTree