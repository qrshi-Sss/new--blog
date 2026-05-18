import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CategoryEntity } from '../content/entities/category.entity'
import { PublishStatus, DocEntity } from '../content/entities/doc.entity'
import { ResultData } from '@/common/utils/result'

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepo: Repository<CategoryEntity>,
    @InjectRepository(DocEntity)
    private readonly docRepo: Repository<DocEntity>
  ) {}

  async getCategories() {
    const categories = await this.categoryRepo.find({ order: { sortOrder: 'ASC' } })
    return ResultData.success(200, '获取成功', categories)
  }

  async getDocs(categoryId: number) {
    const docs = await this.docRepo.find({
      where: { status: PublishStatus.PUBLISHED, categoryId: categoryId },
      select: ['id', 'title']
    })
    return ResultData.success(200, '获取成功', docs)
  }

  async getDoc(id: number) {
    const doc = await this.docRepo.findOne({
      where: { id, status: PublishStatus.PUBLISHED },
      relations: ['category']
    })
    if (!doc) {
      return ResultData.fail(404, '文档不存在')
    }
    return ResultData.success(200, '获取成功', doc)
  }
}
