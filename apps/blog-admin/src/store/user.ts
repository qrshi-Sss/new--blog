import { create } from 'zustand'
import type { MenuProps } from 'antd'

interface UserInfo {
  id?: number
  username?: string
  avatar?: string
  [key: string]: unknown
}

export interface UserState {
  userInfo: UserInfo
  menuList: MenuProps['items']
  setUserInfo: (info: UserInfo) => void
  setMenuList: (menus: MenuProps['items']) => void
  logout: () => void
}

export const useUserStore = create<UserState>((set) => ({
  userInfo: JSON.parse(sessionStorage.getItem('userInfo') || '{}'),
  menuList: [],
  setUserInfo: (info) => {
    sessionStorage.setItem('userInfo', JSON.stringify(info))
    set({ userInfo: info })
  },
  setMenuList: (menus) => set({ menuList: menus }),
  logout: () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('userInfo')
    set({ userInfo: {}, menuList: [] })
  },
}))
