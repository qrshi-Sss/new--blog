import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index
} from 'typeorm'
import { CategoryEntity } from './category.entity'

export enum PublishStatus {
  DRAFT = 0,
  PUBLISHED = 1
}

@Entity('doc')
export class DocEntity {
  @PrimaryGeneratedColumn('increment', { type: 'int', comment: '文档ID' })
  id: number

  @Column({ type: 'varchar', length: 255, comment: '文档标题' })
  title: string

  @Column({ type: 'text', comment: '文档内容' })
  content: string

  @Column({ type: 'text', nullable: true, comment: '文档摘要' })
  summary: string | null

  @Index('idx_category_id')
  @Column({ name: 'category_id', type: 'int', comment: '分类ID' })
  categoryId: number

  @ManyToOne(() => CategoryEntity, (category) => category.docs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity

  @Column({ type: 'int', default: 0, comment: '浏览量' })
  views: number

  @Column({
    type: 'tinyint',
    enum: PublishStatus,
    default: PublishStatus.DRAFT,
    comment: '发布状态'
  })
  status: PublishStatus

  @CreateDateColumn({ name: 'created_at', type: 'datetime', comment: '创建时间' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime', comment: '更新时间' })
  updatedAt: Date
}
