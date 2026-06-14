import { Controller, Get, Param, Query } from '@nestjs/common'
import { ClientService } from './client.service'
import { ApiTags, ApiOperation } from '@nestjs/swagger'

@ApiTags('客户端')
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @ApiOperation({ summary: '获取分类列表' })
  @Get('/categories')
  getCategories() {
    return this.clientService.getCategories()
  }

  @ApiOperation({ summary: '获取文档列表' })
  @Get('/docs')
  getDocs(@Query('categoryId') categoryId: number) {
    return this.clientService.getDocs(categoryId)
  }

  @ApiOperation({ summary: '获取文档详情' })
  @Get('/docs/:id')
  getDoc(@Param('id') id: string) {
    return this.clientService.getDoc(+id)
  }
}
