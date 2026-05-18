import { useEffect } from 'react'
import { Layout, theme } from 'antd'
import { Outlet } from 'react-router-dom'
import LayoutHeader from './components/header/index'
import LayoutMenu from './components/menu/index'
import { useUserStore } from '../store/user'
import { defaultMenuItems } from '../router/menuConfig'
import './index.scss'

const { Content, Sider } = Layout

const AppLayout: React.FC = () => {
  const setMenuList = useUserStore((s) => s.setMenuList)
  const menuList = useUserStore((s) => s.menuList)
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  useEffect(() => {
    if (!menuList || menuList.length === 0) {
      setMenuList(defaultMenuItems)
    }
  }, [menuList, setMenuList])

  return (
    <Layout className="app-layout">
      <LayoutHeader />
      <Layout className="app-layout-inner">
        <Sider className="app-layout-sider" style={{ background: colorBgContainer }}>
          <LayoutMenu />
        </Sider>
        <Layout className="app-layout-content-wrapper">
          <Content
            className="app-layout-content"
            style={{ background: colorBgContainer, borderRadius: borderRadiusLG }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default AppLayout
