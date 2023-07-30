import { join } from 'path'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ServeStaticModule } from '@nestjs/serve-static'
import { APP_GUARD } from '@nestjs/core'

import { TextileModule } from './textile/textile.module'
import { TextileEntity } from './textile/entities/textile.entity'
import { AuthModule } from './auth/auth.module'
import { AuthGuard } from './auth/auth.guard'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'swagger-static'),
      serveRoot: process.env.NODE_ENV === 'development' ? '/' : '/swagger'
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ep-icy-sun-981326.eu-central-1.aws.neon.tech',
      port: 5432,
      username: 'Hazard-87',
      password: 'bE4KCHFePSr3',
      database: 'marketdb',
      entities: [TextileEntity],
      ssl: true,
      synchronize: true
    }),
    TextileModule,
    AuthModule,
    UsersModule
  ],

  controllers: [AppController],
  providers: [
    AppService
    //TODO: раскомментировать чтобы включить глобальную защиту
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard
    // }
  ]
})
export class AppModule {}
