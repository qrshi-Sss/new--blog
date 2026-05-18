import MdxRenderer from '@/components/MdxRenderer'
import TocNavigation from '@/components/TocNavigation'
import { extractHeadings, generateTableOfContents } from '@/utils/markdown'
import { docsApi } from '@/lib/api'

interface DocPageProps {
  params: Promise<{ categoryId: string; docId: string }>
}

export default async function DocPage({ params }: DocPageProps) {
  const { categoryId, docId } = await params
  let currentDoc = null

  try {
    const res = await docsApi.getDocDetail(docId)
    currentDoc = res.data || null
  } catch {}

  const headings = currentDoc ? extractHeadings(currentDoc.content) : []
  const tableOfContents = generateTableOfContents(headings)

  return (
    <div className="flex flex-row lg:gap-8">
      <div className="min-w-0 flex-1">
        {currentDoc ? (
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 lg:p-10">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <MdxRenderer content={currentDoc.content} />
            </div>

            <div className="mt-12 border-t border-border pt-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{currentDoc.title}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-card p-10 text-center">
            <p className="text-muted-foreground">暂无文档内容</p>
          </div>
        )}
      </div>

      <div className="hidden shrink-0 scrollbar-hide lg:sticky lg:top-(--header-height) lg:h-[calc(100vh-var(--header-height)-1rem)] lg:w-64 lg:self-start lg:overflow-y-auto lg:pt-4 xl:block">
        <TocNavigation headings={tableOfContents} />
      </div>
    </div>
  )
}
