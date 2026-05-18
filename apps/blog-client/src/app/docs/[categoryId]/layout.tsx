import { docsApi, type DocListItemType } from '@/lib/api'
import Sidebar from '@/components/Sidebar'

interface DocsLayoutProps {
  children: React.ReactNode
  params: Promise<{ categoryId: string }>
}

export default async function DocsLayout({ children, params }: DocsLayoutProps) {
  const { categoryId } = await params
  let docsList: DocListItemType[] = []
  let categoryName = ''

  try {
    const res = await docsApi.getDocList({ categoryId })
    docsList = res.data || []
  } catch {}

  try {
    const { data: categories } = await docsApi.getCategoryList()
    const category = categories?.find((c) => c.id == categoryId)
    categoryName = category?.name || ''
  } catch {}

  return (
    <div className="min-h-full">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:gap-8">
          <div className="sticky top-(--header-height) z-1 w-full shrink-0 self-start bg-white pt-4 pb-4 lg:h-[calc(100vh-var(--header-height))] lg:w-64 lg:overflow-y-auto lg:pt-4">
            <Sidebar categoryId={categoryId} categoryName={categoryName} docslist={docsList} />
          </div>

          <div className="min-w-0 flex-1 lg:pt-4 lg:pb-4">{children}</div>
        </div>
      </div>
    </div>
  )
}
