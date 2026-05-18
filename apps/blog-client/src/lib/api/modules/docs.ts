import { request } from '../request'

export interface CategoryItemType {
  id: string
  name: string
  description: string
  docCount: number
  sortOrder: number
}

// 获取文档分类列表
export function getCategoryList() {
  return request.get<CategoryItemType[]>({
    url: '/categories',
  })
}

export interface DocDetailType {
  id: string
  title: string
  content: string
  categoryId: string
  category: CategoryItemType
}

export type DocListItemType = Pick<DocDetailType, 'id' | 'title'>

// 根据文档ID获取文档详情
export function getDocDetail(docId: string) {
  return request.get<DocDetailType>({
    url: `/docs/${docId}`,
  })
}

// 获取文档列表
export function getDocList(query: { categoryId?: string }) {
  return request.get<DocListItemType[]>({
    url: '/docs',
    query,
  })
}
