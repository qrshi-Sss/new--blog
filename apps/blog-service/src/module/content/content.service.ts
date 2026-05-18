import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CategoryEntity } from './entities/category.entity'
import { DocEntity, PublishStatus } from './entities/doc.entity'
import { CreateCategoryDto, UpdateCategoryDto, SortCategoryDto } from './dto/category.dto'
import { CreateDocDto, UpdateDocDto } from './dto/doc.dto'
import { ResultData } from '@/common/utils/result'
import { WebhookService } from '@/module/webhook/webhook.service'

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepo: Repository<CategoryEntity>,
    @InjectRepository(DocEntity)
    private readonly docRepo: Repository<DocEntity>,
    private readonly webhookService: WebhookService
  ) {}

  // ========== Category ==========

  async getCategories() {
    const categories = await this.categoryRepo.find({ order: { sortOrder: 'ASC' } })
    return ResultData.success(200, '获取成功', categories)
  }

  async createCategory(dto: CreateCategoryDto) {
    const existing = await this.categoryRepo.findOne({ where: { name: dto.name } })
    if (existing) {
      return ResultData.fail(409, '分类名称已存在')
    }

    const maxSort = await this.categoryRepo
      .createQueryBuilder('category')
      .select('MAX(category.sortOrder)', 'max')
      .getRawOne()

    const sortOrder = (maxSort?.max ?? 0) + 1

    const category = this.categoryRepo.create({
      name: dto.name,
      description: dto.description || undefined,
      sortOrder
    })
    await this.categoryRepo.save(category)

    await this.webhookService.revalidateCategory(category.id)

    return ResultData.success(200, '创建成功', category)
  }

  async updateCategory(id: number, dto: UpdateCategoryDto) {
    const category = await this.categoryRepo.findOne({ where: { id } })
    if (!category) {
      return ResultData.fail(404, '分类不存在')
    }

    const existing = await this.categoryRepo.findOne({ where: { name: dto.name } })
    if (existing && existing.id !== id) {
      return ResultData.fail(409, '分类名称已存在')
    }

    category.name = dto.name
    category.description = dto.description || (null as any)
    await this.categoryRepo.save(category)

    // await this.webhookService.revalidateCategory(id)

    return ResultData.success(200, '更新成功', category)
  }

  async deleteCategory(id: number) {
    const category = await this.categoryRepo.findOne({ where: { id } })
    if (!category) {
      return ResultData.fail(404, '分类不存在')
    }
    await this.categoryRepo.remove(category)

    await this.webhookService.revalidateCategory(id)

    return ResultData.success(200, '删除成功')
  }

  async sortCategory(dto: SortCategoryDto) {
    const { items } = dto
    for (const item of items) {
      await this.categoryRepo.update(item.id, { sortOrder: item.sortOrder })
    }
    return ResultData.success(200, '排序成功')
  }

  // ========== Doc ==========

  // 获取文档列表
  async getDocs(categoryId?: number) {
    const where = categoryId ? { categoryId } : {}
    const docs = await this.docRepo.find({
      where,
      order: { createdAt: 'DESC' },
      relations: ['category']
    })
    return ResultData.success(200, '获取成功', docs)
  }

  // 获取文档详情
  async getDoc(id: number) {
    const doc = await this.docRepo.findOne({
      where: { id },
      relations: ['category']
    })
    if (!doc) {
      return ResultData.fail(404, '文档不存在')
    }
    return ResultData.success(200, '获取成功', doc)
  }

  async createDoc(dto: CreateDocDto) {
    const category = await this.categoryRepo.findOne({ where: { id: dto.categoryId } })
    if (!category) {
      return ResultData.fail(404, '分类不存在')
    }

    const doc = this.docRepo.create({
      title: dto.title,
      content: dto.content,
      summary: dto.summary || undefined,
      categoryId: dto.categoryId,
      status: dto.status || PublishStatus.DRAFT
    })
    await this.docRepo.save(doc)

    await this.categoryRepo.increment({ id: dto.categoryId }, 'docCount', 1)

    await this.webhookService.revalidateDoc(doc.id)

    return ResultData.success(200, '创建成功', doc)
  }

  async updateDoc(id: number, dto: UpdateDocDto) {
    const doc = await this.docRepo.findOne({ where: { id } })
    if (!doc) {
      return ResultData.fail(404, '文档不存在')
    }

    if (dto.categoryId && dto.categoryId !== doc.categoryId) {
      const category = await this.categoryRepo.findOne({ where: { id: dto.categoryId } })
      if (!category) {
        return ResultData.fail(404, '分类不存在')
      }
      await this.categoryRepo.decrement({ id: doc.categoryId }, 'docCount', 1)
      await this.categoryRepo.increment({ id: dto.categoryId }, 'docCount', 1)
    }

    await this.docRepo.update(id, dto as any)
    const updated = await this.docRepo.findOne({ where: { id }, relations: ['category'] })

    await this.webhookService.revalidateDoc(id)

    return ResultData.success(200, '更新成功', updated)
  }

  async deleteDoc(id: number) {
    const doc = await this.docRepo.findOne({ where: { id } })
    if (!doc) {
      return ResultData.fail(404, '文档不存在')
    }

    await this.docRepo.remove(doc)

    await this.categoryRepo.decrement({ id: doc.categoryId }, 'docCount', 1)

    await this.webhookService.revalidateDoc(id)

    return ResultData.success(200, '删除成功')
  }
}
