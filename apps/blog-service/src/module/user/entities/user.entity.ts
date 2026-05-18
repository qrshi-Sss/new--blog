import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', comment: '用户ID' })
  id: string

  @Column({ type: 'varchar', length: 20, unique: true, comment: '手机号（登录账号）' })
  phone: string

  @Column({ type: 'varchar', length: 20, nullable: true, comment: 'githubID' })
  githubId?: string

  @Column({ type: 'varchar', length: 128, comment: '用户密码' })
  password?: string

  @Column({ type: 'varchar', length: 50, comment: '用户昵称' })
  username: string

  @CreateDateColumn({ name: 'created_at', type: 'datetime', comment: '创建时间' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime', comment: '更新时间' })
  updatedAt: Date
}
