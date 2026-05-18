import { PublishedStatus } from '@/enums/content'

export interface CategoryItem {
  id: number
  name: string
  description: string | null
  docCount: number
  sortOrder: number
}

export interface CreateCategoryParams {
  name: string
  description?: string
}

export interface UpdateCategoryParams {
  name: string
  description?: string
}

export interface SortItem {
  id: number
  sortOrder: number
}

export interface DocItem {
  id: number
  title: string
  content: string
  summary: string | null
  categoryId: number
  category: { id: number; name: string }
  views: number
  status: PublishedStatus
  createdAt: string
  updatedAt: string
}

export interface CreateDocParams {
  title: string
  content: string
  summary?: string
  categoryId: number
  status: PublishedStatus
}

export interface UpdateDocParams {
  title?: string
  content?: string
  summary?: string
  categoryId?: number
  status?: PublishedStatus
}
