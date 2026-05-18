import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { DocEntity } from './doc.entity'

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn('increment', { type: 'int', comment: '分类ID' })
  id: number

  @Column({ type: 'varchar', length: 255, unique: true, comment: '分类名称' })
  name: string

  @Column({ type: 'text', nullable: true, comment: '分类描述' })
  description: string | null

  @Column({ type: 'int', default: 0, comment: '文档数量' })
  docCount: number

  @Column({ type: 'int', default: 0, comment: '排序序号' })
  sortOrder: number

  @OneToMany(() => DocEntity, (doc) => doc.category)
  docs: DocEntity[]
}
