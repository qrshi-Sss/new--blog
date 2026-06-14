import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'
import { ValidationPipe } from './common/pipes/validate.pipe'
import { HttpExceptionFilter } from './common/filters/http-exception-filter'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { apiReference } from '@scalar/nestjs-api-reference'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  // CORS 配置，允许 blog 前端和管理后台访问
  app.enableCors({
    origin: '*',
    credentials: true
  })

  // 静态文件目录
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: ''
  })

  // 全局验证
  app.useGlobalPipes(new ValidationPipe())

  // 全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter())

  // 设置接口前缀
  app.setGlobalPrefix('api')

  // OpenAPI 文档配置（由 @nestjs/swagger 生成规范）
  const config = new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription('系统接口文档')
    .setVersion('1.0')
    .addBearerAuth() // 添加 JWT Bearer 认证
    .build()
  const document = SwaggerModule.createDocument(app, config)

  // Scalar API Reference（现代化 UI）
  app.use(
    '/api/reference',
    apiReference({
      content: document,
      theme: 'purple',
      metaData: {
        title: 'Blog API 文档',
        description: '系统接口文档 - Scalar'
      }
    })
  )

  await app.listen(process.env.PORT ?? 3333)
}
bootstrap()
