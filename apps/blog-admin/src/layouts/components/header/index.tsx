import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout, Dropdown, Avatar, Space } from 'antd'
import type { MenuProps } from 'antd'
import { UserOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons'
import { useUserStore, UserState } from '../../../store/user'
import SettingsDrawer from '../setting'
import type { SettingsDrawerRef } from '../setting'
import './index.scss'

const { Header } = Layout

const LayoutHeader: React.FC = () => {
  const settingsDrawerRef = useRef<SettingsDrawerRef>(null)
  const navigate = useNavigate()
  const userInfo = useUserStore((s: UserState) => s.userInfo)
  const logout = useUserStore((s: UserState) => s.logout)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const items: MenuProps['items'] = [
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '系统设置',
      onClick: () => {
        settingsDrawerRef.current?.show()
      },
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: handleLogout,
    },
  ]

  return (
    <Header className="layout-header">
      <div className="layout-header-title">4Zero4</div>
      <Dropdown menu={{ items }} placement="bottomRight">
        <Space className="layout-header-user">
          <Avatar size="small" icon={<UserOutlined />} />
          <span>{(userInfo as { username?: string })?.username || '管理员'}</span>
        </Space>
      </Dropdown>
      {/* 系统设置抽屉组件 */}
      <SettingsDrawer ref={settingsDrawerRef} />
    </Header>
  )
}

export default LayoutHeader
