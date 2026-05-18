import React, { lazy } from 'react'
import {
  DashboardOutlined,
  EditOutlined,
  MessageOutlined,
  UserOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import type { RouteObject } from 'react-router-dom'
import type { MenuProps } from 'antd'

export interface MenuRoute {
  label: string
  path: string
  icon?: React.ReactNode
  component?: React.LazyExoticComponent<React.FC>
  children?: MenuRoute[]
}

type MenuItem = NonNullable<MenuProps['items']>[number]

const menuRoutes: MenuRoute[] = [
  {
    label: '首页',
    path: '/home',
    icon: <DashboardOutlined />,
    component: lazy(() => import('../views/home/index')),
  },
  {
    label: '内容管理',
    path: '/content',
    icon: <EditOutlined />,
    children: [
      {
        label: '文章管理',
        path: '/content/articles',
        component: lazy(() => import('../views/content/articles/index')),
      },
    ],
  },
  {
    label: '系统设置',
    path: '/settings',
    icon: <SettingOutlined />,
    component: lazy(() => import('../views/settings/index')),
  },
]

export function generateRoutes(menus: MenuRoute[]): RouteObject[] {
  return menus.map((menu) => {
    const route: RouteObject = {
      path: menu.path,
    }
    if (menu.component) {
      route.element = <menu.component />
    }
    if (menu.children) {
      route.children = generateRoutes(menu.children)
    }
    return route
  })
}

export function generateMenuItems(menus: MenuRoute[]): MenuItem[] {
  return menus.map((menu) => {
    const item: MenuItem = {
      key: menu.path,
      icon: menu.icon,
      label: menu.label,
    } as MenuItem
    if (menu.children) {
      ;(item as unknown as Record<string, unknown>).children = generateMenuItems(menu.children)
    }
    return item
  })
}

export const defaultMenuItems = generateMenuItems(menuRoutes)

export default menuRoutes
