import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ContentController } from './content.controller'
import { ContentService } from './content.service'
import { CategoryEntity } from './entities/category.entity'
import { DocEntity } from './entities/doc.entity'

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity, DocEntity])],
  controllers: [ContentController],
  providers: [ContentService],
  exports: [ContentService]
})
export class ContentModule {}
