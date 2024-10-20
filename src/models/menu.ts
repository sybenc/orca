export enum MenuTypeEnum {
  Menu = 'Menu',
  Directory = 'Directory',
  Button = 'Button',
}

// 定义 Menu 接口
export interface Menu {
  readonly menuId: number
  readonly createdAt?: number
  readonly updatedAt?: number
  deletedAt?: number
  label: string
  code: string
  parentId: number
  type: MenuTypeEnum
  route?: string
  component?: string
  iconName?: string
  order: string
  keepAlive: boolean
  show: boolean
  status: boolean
  description: string
  children?: Menu[]
}

export interface MenuList {
  items: Menu[]
  total: number
}

export function menuListToTree(data: Menu[]): Menu[] {
  const map = new Map<number, Menu>()
  const tree: Menu[] = []

  data.forEach((item: Menu) => {
    if (item.type !== MenuTypeEnum.Button) {
      map.set(item.menuId!, { ...item, children: [] })
    }
  })

  // 建立树结构
  data.forEach((item: Menu) => {
    const subTree = map.get(item.menuId!)

    // 确保 subTree 存在，并且有 parentId
    if (subTree && item.parentId) {
      const parent = map.get(item.parentId)

      // 如果找到父节点，插入到父节点的 children 数组
      if (parent) {
        parent.children!.push(subTree)
      } else {
        // 如果没有找到父节点，将其作为根节点
        tree.push(subTree)
      }
    } else if (subTree) {
      // 如果没有 parentId，直接作为根节点
      tree.push(subTree)
    }
  })

  return tree
}

