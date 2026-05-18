'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import HeaderDesktop from './HeaderDesktop'
import HeaderMobile from './HeaderMobile'

export default function Header() {
  // 监听窗口大小变化，关闭移动端菜单（保留原有逻辑）
  useEffect(() => {
    const handleResize = () => {
      // 这里可以添加全局的resize处理逻辑
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <header className="h-[var(--header-height)] w-full fixed top-0 z-40 border-b bg-white">
      <div className="flex items-center justify-between h-full px-4 py-3">
        <div className="flex items-center gap-10">
          <Link href="/" className="max-md:text-2xl md:text-xl  font-comic font-bold text-nowrap ">
            4Zero4 Not Found
          </Link>
        </div>

        {/* PC端导航栏 */}
        <HeaderDesktop />

        {/* 移动端导航栏 */}
        <HeaderMobile />
      </div>
    </header>
  )
}
