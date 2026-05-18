import { Menu } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState, useCallback } from 'react'
import { useUserStore, UserState } from '../../../store/user'
import './index.scss'

const LayoutMenu: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const menuList = useUserStore((s: UserState) => s.menuList)
  const [openKeys, setOpenKeys] = useState<string[]>([])

  const findParentKeys = useCallback(
    (path: string): string[] => {
      if (!menuList) return []
      const keys: string[] = []
      for (const item of menuList) {
        const menuItem = item as { key: string; children?: { key: string }[] }
        if (menuItem.children?.some((child) => child.key === path)) {
          keys.push(menuItem.key)
        }
      }
      return keys
    },
    [menuList],
  )

  useEffect(() => {
    const parents = findParentKeys(location.pathname)
    if (parents.length > 0) {
      setOpenKeys((prev) => [...new Set([...prev, ...parents])])
    }
  }, [location.pathname, findParentKeys])

  return (
    <Menu
      mode="inline"
      selectedKeys={[location.pathname]}
      openKeys={openKeys}
      onOpenChange={setOpenKeys}
      className="layout-menu"
      items={menuList}
      onClick={({ key }) => navigate(key)}
    />
  )
}

export default LayoutMenu
