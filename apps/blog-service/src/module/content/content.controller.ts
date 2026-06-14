import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common'
import { ContentService } from './content.service'
import { CreateCategoryDto, UpdateCategoryDto, SortCategoryDto } from './dto/category.dto'
import { CreateDocDto, UpdateDocDto } from './dto/doc.dto'
import { ApiTags, ApiOperation } from '@nestjs/swagger'

@ApiTags('内容管理')
@Controller()
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  // ========== Category ==========

  @ApiOperation({ summary: '获取分类列表' })
  @Get('/categories')
  getCategories() {
    return this.contentService.getCategories()
  }

  @ApiOperation({ summary: '创建分类' })
  @Post('/categories')
  createCategory(@Body() dto: CreateCategoryDto) {
    return this.contentService.createCategory(dto)
  }

  @ApiOperation({ summary: '排序分类' })
  @Post('/categories/sort')
  sortCategory(@Body() dto: SortCategoryDto) {
    return this.contentService.sortCategory(dto)
  }

  @ApiOperation({ summary: '更新分类' })
  @Post('/categories/update/:id')
  updateCategory(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.contentService.updateCategory(+id, dto)
  }

  @ApiOperation({ summary: '删除分类' })
  @Post('/categories/remove/:id')
  deleteCategory(@Param('id') id: string) {
    return this.contentService.deleteCategory(+id)
  }

  // ========== Doc ==========

  @ApiOperation({ summary: '获取文档列表' })
  @Get('/docs')
  getDocs(@Query('categoryId') categoryId?: string) {
    return this.contentService.getDocs(categoryId ? +categoryId : undefined)
  }

  @ApiOperation({ summary: '获取文档详情' })
  @Get('/docs/:id')
  getDoc(@Param('id') id: string) {
    return this.contentService.getDoc(+id)
  }

  @ApiOperation({ summary: '创建文档' })
  @Post('/docs')
  createDoc(@Body() dto: CreateDocDto) {
    return this.contentService.createDoc(dto)
  }

  @ApiOperation({ summary: '更新文档' })
  @Post('/docs/update/:id')
  updateDoc(@Param('id') id: string, @Body() dto: UpdateDocDto) {
    return this.contentService.updateDoc(+id, dto)
  }

  @ApiOperation({ summary: '删除文档' })
  @Post('/docs/remove/:id')
  deleteDoc(@Param('id') id: string) {
    return this.contentService.deleteDoc(+id)
  }
}
