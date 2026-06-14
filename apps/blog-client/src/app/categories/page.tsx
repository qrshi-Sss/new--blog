'use client'

import Link from 'next/link'
import { FolderOpen, ChevronRight } from 'lucide-react'
import { docsApi, type CategoryItemType } from '@/lib/api'
import { useEffect, useState } from 'react'

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryItemType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await docsApi.getCategoryList()
        setCategories(data || [])
      } catch (error) {
        console.error('获取分类列表失败:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="text-center">加载中...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
        {categories.length > 0 &&
          categories.map((category) => (
            <Link
              key={category.id}
              href={`/docs/${category.id}`}
              className="group block no-underline"
            >
              <div className="h-full rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:scale-[1.02] hover:border-primary/30 hover:shadow-lg">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="mb-2 text-lg font-semibold text-foreground">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.docCount} 篇文档</p>
                  </div>
                  <FolderOpen className="h-6 w-6 shrink-0 text-primary/40" />
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                  <span className="text-sm font-medium text-primary group-hover:underline">
                    查看全部
                  </span>
                  <ChevronRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
      </div>

      {categories.length === 0 && !loading && (
        <div className="py-16 text-center">
          <FolderOpen className="mx-auto mb-4 h-16 w-16 text-muted-foreground/50" />
          <h3 className="mb-2 text-xl font-semibold text-foreground">暂无分类</h3>
          <p className="text-muted-foreground">还没有创建任何文档分类</p>
        </div>
      )}
    </div>
  )
}
