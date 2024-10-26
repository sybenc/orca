export enum MenuTypeEnum {
  Menu = 'Menu',
  Directory = 'Directory',
  Button = 'Button',
}

// 定义 Menu 接口
export interface Menu {
  readonly menuId: string;
  readonly createdAt?: number
  readonly updatedAt?: number
  deletedAt?: number
  label: string
  code: string
  parentId: string
  type: MenuTypeEnum
  route?: string
  component?: string
  iconName?: string
  order: number
  keepAlive: boolean
  show: boolean
  status: boolean
  description: string
  layer: number // 记录菜单层级
  children?: Menu[]
}

export interface MenuList {
  items: Menu[]
  total: number
}

export function menuListToTree(data: Menu[]): Menu[] {
  const map = new Map<string, Menu>()
  const tree: Menu[] = []

  data.forEach((item: Menu) => {
    if (item.type !== MenuTypeEnum.Button) {
      map.set(item.menuId!, { ...item, children: [], layer: 0 })
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
        subTree.layer = parent.layer + 1
        parent.children!.push(subTree)
      } else {
        // 如果没有找到父节点，将其作为根节点
        subTree.layer = 0
        tree.push(subTree)
      }
    } else if (subTree) {
      // 如果没有 parentId，直接作为根节点
      subTree.layer = 0
      tree.push(subTree)
    }
  })

  // data.sort((a, b) => a.order - b.order)

  return tree
}

