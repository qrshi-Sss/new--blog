import { Controller, Get, Param, Query } from '@nestjs/common'
import { ClientService } from './client.service'

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get('/categories')
  getCategories() {
    return this.clientService.getCategories()
  }

  @Get('/docs')
  getDocs(@Query('categoryId') categoryId: number) {
    return this.clientService.getDocs(categoryId)
  }

  @Get('/docs/:id')
  getDoc(@Param('id') id: string) {
    return this.clientService.getDoc(+id)
  }
}
