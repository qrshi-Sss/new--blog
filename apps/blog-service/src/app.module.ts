import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import config from '@/config/index'
import { DatabaseModule } from '@/db/mysql/db.module'
import { RedisModule } from '@/db/redis/redis.module'
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard'

import { AuthModule } from '@/module/auth/auth.module'
import { UserModule } from '@/module/user/user.module'
import { ContentModule } from '@/module/content/content.module'
import { ClientModule } from '@/module/client/client.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [config],
      cache: true
    }),
    DatabaseModule,
    RedisModule,

    // system
    AuthModule,
    UserModule,

    // business
    ContentModule,
    ClientModule
  ],
  controllers: [],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard
    }
  ]
})
export class AppModule {}
