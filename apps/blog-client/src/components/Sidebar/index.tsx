'use client'

import { usePathname } from 'next/navigation'
import type { DocListItemType } from '@/lib/api'
import SidebarDesktop from './SidebarDesktop'
import SidebarMobile from './SidebarMobile'

interface SidebarProps {
  categoryId: string
  categoryName: string
  docslist: DocListItemType[]
}

export default function Sidebar({ categoryId, categoryName, docslist }: SidebarProps) {
  const pathname = usePathname()
  const pathParts = pathname.split('/')
  const currentDocId = pathParts.length > 3 ? pathParts[3] : ''

  return (
    <>
      <div className="lg:hidden">
        <SidebarMobile
          categoryId={categoryId}
          categoryName={categoryName}
          docslist={docslist}
          currentDocId={currentDocId}
        />
      </div>

      <div className="hidden lg:block">
        <SidebarDesktop
          categoryId={categoryId}
          categoryName={categoryName}
          docslist={docslist}
          currentDocId={currentDocId}
        />
      </div>
    </>
  )
}
