'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import More from '@/components/icons/more.svg'
import Close from '@/components/icons/close.svg'
import Github from '@/components/icons/github.svg'

const menus = [
  { title: '文档', href: '/categories' },
  { title: '工具', href: '/tools' },
]

/**
 * 移动端Header组件
 * 包含汉堡菜单和移动端导航
 */
export default function HeaderMobile() {
  const [isOpen, setIsOpen] = useState(false)

  const toGithub = () => {
    window.open('https://github.com/qrshi-Sss', '_blank')
  }

  // 监听窗口宽度变化，当宽度变化时关闭菜单
  useEffect(() => {
    const handleResize = () => {
      if (isOpen) {
        setIsOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isOpen])

  return (
    <>
      <div className="align-center flex shrink-0 gap-3 lg:hidden">
        {!isOpen && <More className="h-7 w-6 cursor-pointer" onClick={() => setIsOpen(!isOpen)} />}
        {isOpen && <Close className="h-7 w-6 cursor-pointer" onClick={() => setIsOpen(!isOpen)} />}
      </div>

      {/* 移动端菜单 - 像抽屉一样从上展开，占满header下面空间 */}
      <div
        className={`absolute top-full right-0 left-0 z-50 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'h-[calc(100vh-var(--header-height))] opacity-100' : 'h-0 opacity-0'}`}
      >
        <div className="h-full border-t border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900">
          <div className="flex h-full flex-col">
            <div className="flex-1 overflow-y-auto">
              {menus.map((m) => (
                <Link
                  key={m.title}
                  href={m.href}
                  className="block px-4 py-3 text-center text-base transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setIsOpen(false)}
                >
                  {m.title}
                </Link>
              ))}
              <button
                onClick={() => {
                  toGithub()
                  setIsOpen(false)
                }}
                className="flex w-full items-center justify-center px-4 py-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Github className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
