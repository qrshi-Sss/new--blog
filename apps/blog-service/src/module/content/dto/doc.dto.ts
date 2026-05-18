import { IsNotEmpty, IsOptional, IsString, IsNumber, MaxLength } from 'class-validator'
import { PublishStatus } from '../entities/doc.entity'

export class CreateDocDto {
  @IsNotEmpty({ message: '文档标题不能为空' })
  @IsString()
  @MaxLength(100, { message: '文档标题最长100个字符' })
  title: string

  @IsNotEmpty({ message: '文档内容不能为空' })
  @IsString()
  content: string

  @IsOptional()
  @IsString()
  @MaxLength(300, { message: '文档摘要最长300个字符' })
  summary?: string

  @IsNotEmpty({ message: '请选择分类' })
  @IsNumber()
  categoryId: number

  @IsOptional()
  @IsNumber()
  status: PublishStatus
}

export class UpdateDocDto {
  @IsOptional()
  @IsString()
  @MaxLength(100, { message: '文档标题最长100个字符' })
  title?: string

  @IsOptional()
  @IsString()
  content?: string

  @IsOptional()
  @IsString()
  @MaxLength(300, { message: '文档摘要最长300个字符' })
  summary?: string

  @IsOptional()
  @IsNumber()
  categoryId?: number

  @IsOptional()
  @IsNumber()
  status: PublishStatus
}
