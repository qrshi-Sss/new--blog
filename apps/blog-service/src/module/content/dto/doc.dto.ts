import { IsNotEmpty, IsOptional, IsString, IsNumber, MaxLength } from 'class-validator'
import { PublishStatus } from '../entities/doc.entity'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateDocDto {
  @ApiProperty({ description: '文档标题' })
  @IsNotEmpty({ message: '文档标题不能为空' })
  @IsString()
  @MaxLength(100, { message: '文档标题最长100个字符' })
  title: string

  @ApiProperty({ description: '文档内容' })
  @IsNotEmpty({ message: '文档内容不能为空' })
  @IsString()
  content: string

  @ApiPropertyOptional({ description: '文档摘要' })
  @IsOptional()
  @IsString()
  @MaxLength(300, { message: '文档摘要最长300个字符' })
  summary?: string

  @ApiProperty({ description: '分类 ID' })
  @IsNotEmpty({ message: '请选择分类' })
  @IsNumber()
  categoryId: number

  @ApiPropertyOptional({ description: '发布状态', enum: PublishStatus })
  @IsOptional()
  @IsNumber()
  status: PublishStatus
}

export class UpdateDocDto {
  @ApiPropertyOptional({ description: '文档标题' })
  @IsOptional()
  @IsString()
  @MaxLength(100, { message: '文档标题最长100个字符' })
  title?: string

  @ApiPropertyOptional({ description: '文档内容' })
  @IsOptional()
  @IsString()
  content?: string

  @ApiPropertyOptional({ description: '文档摘要' })
  @IsOptional()
  @IsString()
  @MaxLength(300, { message: '文档摘要最长300个字符' })
  summary?: string

  @ApiPropertyOptional({ description: '分类 ID' })
  @IsOptional()
  @IsNumber()
  categoryId?: number

  @ApiPropertyOptional({ description: '发布状态', enum: PublishStatus })
  @IsOptional()
  @IsNumber()
  status: PublishStatus
}
