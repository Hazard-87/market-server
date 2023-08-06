import { join } from 'path'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ServeStaticModule } from '@nestjs/serve-static'
// import { GraphQLModule } from '@nestjs/graphql'
// import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { TextileModule } from './textile/textile.module'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { ImageModule } from './image/image.module'
// import { FurnituresModule } from './furnitures/furnitures.module'
import { TextileTypesModule } from './textile-types/textile-types.module';

@Module({
  imports: [
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   playground: true,
    //   introspection: true,
    //   autoSchemaFile: 'schema.gql'
    // }),
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
      entities: [__dirname + 'dist/**/*.entity{.ts,.js}'],
      ssl: true,
      autoLoadEntities: true,
      synchronize: true
    }),
    TextileModule,
    AuthModule,
    UsersModule,
    ImageModule,
    TextileTypesModule
    // FurnituresModule
  ],

  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
