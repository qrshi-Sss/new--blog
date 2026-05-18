import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'
// import { ValidationPipe } from '@nestjs/common';
// import { ValidationPipe } from '@nestjs/common';
// import { ValidationPipe } from '@nestjs/common';
import { ValidationPipe } from './common/pipes/validate.pipe'
import { HttpExceptionFilter } from './common/filters/http-exception-filter'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  // CORS 配置，允许 blog 前端和管理后台访问
  app.enableCors({
    origin: '*',
    credentials: true,
  })

  // 静态文件目录
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '',
  })

  // 全局验证
  app.useGlobalPipes(new ValidationPipe())

  // 全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter())

  // 设置接口前缀
  app.setGlobalPrefix('api')

  await app.listen(process.env.PORT ?? 3333)
}
bootstrap()
