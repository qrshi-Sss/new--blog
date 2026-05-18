import request from '@/api/request'
import type {
  CategoryItem,
  CreateCategoryParams,
  UpdateCategoryParams,
  SortItem,
  DocItem,
  CreateDocParams,
  UpdateDocParams,
} from './type'

export function getCategories(): Promise<CategoryItem[]> {
  return request.get('/categories')
}

export function createCategory(data: CreateCategoryParams): Promise<CategoryItem> {
  return request.post('/categories', data)
}

export function updateCategory(id: number, data: UpdateCategoryParams): Promise<CategoryItem> {
  return request.post(`/categories/update/${id}`, data)
}

export function deleteCategory(id: number): Promise<void> {
  return request.post(`/categories/remove/${id}`)
}

export function updateCategorySort(items: SortItem[]): Promise<void> {
  return request.post('/categories/sort', { items })
}

export function getDocs(categoryId?: number): Promise<DocItem[]> {
  const params = categoryId ? { categoryId } : {}
  return request.get('/docs', { params })
}

export function createDoc(data: CreateDocParams): Promise<DocItem> {
  return request.post('/docs', data)
}

export function updateDoc(id: number, data: UpdateDocParams): Promise<DocItem> {
  return request.post(`/docs/update/${id}`, data)
}

export function deleteDoc(id: number): Promise<void> {
  return request.post(`/docs/remove/${id}`)
}
