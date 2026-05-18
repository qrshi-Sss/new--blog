import Link from 'next/link'
import { BookOpen, ChevronRight } from 'lucide-react'
import type { DocListItemType } from '@/lib/api'

interface SidebarDesktopProps {
  categoryId: string
  categoryName: string
  docslist: DocListItemType[]
  currentDocId: string
}

export default function SidebarDesktop({
  categoryId,
  categoryName,
  docslist,
  currentDocId,
}: SidebarDesktopProps) {
  return (
    <>
      <div className="mb-6">
        <h2 className="mb-4 flex items-center text-lg font-semibold text-foreground">
          <BookOpen className="mr-2 h-5 w-5" />
          {categoryName}
        </h2>
        <div className="space-y-1">
          {docslist.map((doc) => (
            <Link
              key={doc.id}
              href={`/docs/${categoryId}/${doc.id}`}
              className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                currentDocId == doc.id
                  ? 'bg-primary font-medium text-primary-foreground'
                  : 'text-foreground/80 hover:bg-muted hover:text-foreground'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="truncate">{doc.title}</span>
                {currentDocId === doc.id && <ChevronRight className="h-4 w-4 flex-shrink-0" />}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {docslist.length === 0 && (
        <div className="py-8 text-center">
          <BookOpen className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">该分类下暂无文档</p>
        </div>
      )}
    </>
  )
}
