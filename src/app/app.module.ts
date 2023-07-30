import { join } from 'path'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ServeStaticModule } from '@nestjs/serve-static'

import { TextileModule } from '../textile/textile.module'
import { TextileEntity } from '../textile/entities/textile.entity'
import { AuthModule } from '../auth/auth.module'
import { UsersModule } from '../users/users.module'
import { UserEntity } from '../users/entities/user.entity'

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
      entities: [TextileEntity, UserEntity],
      ssl: true,
      synchronize: true
    }),
    TextileModule,
    AuthModule,
    UsersModule
  ],

  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
