import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateCategoryDto {
  @ApiProperty({ description: '分类名称' })
  @IsNotEmpty({ message: '分类名称不能为空' })
  @IsString()
  @MaxLength(50, { message: '分类名称最长50个字符' })
  name: string

  @ApiPropertyOptional({ description: '分类描述' })
  @IsOptional()
  @IsString()
  @MaxLength(200, { message: '分类描述最长200个字符' })
  description?: string
}

export class UpdateCategoryDto {
  @ApiProperty({ description: '分类名称' })
  @IsNotEmpty({ message: '分类名称不能为空' })
  @IsString()
  @MaxLength(50, { message: '分类名称最长50个字符' })
  name: string

  @ApiPropertyOptional({ description: '分类描述' })
  @IsOptional()
  @IsString()
  @MaxLength(200, { message: '分类描述最长200个字符' })
  description?: string
}

export class SortCategoryItem {
  @ApiProperty({ description: '分类 ID' })
  id: number

  @ApiProperty({ description: '排序序号' })
  sortOrder: number
}

export class SortCategoryDto {
  @ApiProperty({ description: '排序项列表', type: [SortCategoryItem] })
  @IsNotEmpty({ message: '排序数据不能为空' })
  items: SortCategoryItem[]
}
