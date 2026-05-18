import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'

export class CreateCategoryDto {
  @IsNotEmpty({ message: '分类名称不能为空' })
  @IsString()
  @MaxLength(50, { message: '分类名称最长50个字符' })
  name: string

  @IsOptional()
  @IsString()
  @MaxLength(200, { message: '分类描述最长200个字符' })
  description?: string
}

export class UpdateCategoryDto {
  @IsNotEmpty({ message: '分类名称不能为空' })
  @IsString()
  @MaxLength(50, { message: '分类名称最长50个字符' })
  name: string

  @IsOptional()
  @IsString()
  @MaxLength(200, { message: '分类描述最长200个字符' })
  description?: string
}

export class SortCategoryItem {
  id: number
  sortOrder: number
}

export class SortCategoryDto {
  @IsNotEmpty({ message: '排序数据不能为空' })
  items: SortCategoryItem[]
}
