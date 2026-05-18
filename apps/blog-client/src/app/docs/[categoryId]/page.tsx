import { redirect } from 'next/navigation'
import { docsApi } from '@/lib/api'

interface DocsPageProps {
  params: Promise<{ categoryId: string }>
}

export default async function DocsPage({ params }: DocsPageProps) {
  const { categoryId } = await params
  let firstDocId = ''

  try {
    const res = await docsApi.getDocList({ categoryId })
    if (res.data && res.data.length > 0) {
      firstDocId = res.data[0].id
    }
  } catch {}

  if (firstDocId) {
    redirect(`/docs/${categoryId}/${firstDocId}`)
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-10 text-center">
      <p className="text-muted-foreground">该分类下暂无文档</p>
    </div>
  )
}
