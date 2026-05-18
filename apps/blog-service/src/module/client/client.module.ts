import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ClientController } from './client.controller'
import { ClientService } from './client.service'
import { CategoryEntity } from '../content/entities/category.entity'
import { DocEntity } from '../content/entities/doc.entity'

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity, DocEntity])],
  controllers: [ClientController],
  providers: [ClientService]
})
export class ClientModule {}
