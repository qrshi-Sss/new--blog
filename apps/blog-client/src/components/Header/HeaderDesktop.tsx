import Link from 'next/link'
import Github from '@/components/icons/github.svg'

const menus = [
  { title: '文档', href: '/categories' },
  { title: '工具', href: '/tools' },
]

/**
 * PC端Header组件
 * 包含完整的导航菜单和GitHub链接
 */
export default function HeaderDesktop() {
  const toGithub = () => {
    window.open('https://github.com/qrshi-Sss', '_blank')
  }

  return (
    <div className="hidden items-center gap-6 lg:flex">
      <nav className="flex items-center border-r border-gray-200 pl-4">
        {menus.map((m) => (
          <Link key={m.title} href={m.href} className="px-3 text-lg hover:bg-gray-100">
            {m.title}
          </Link>
        ))}
      </nav>

      <Link href="https://github.com/qrshi-Sss" className="cursor-pointer" onClick={toGithub}>
        <Github className="h-6 w-6" />
      </Link>
    </div>
  )
}
