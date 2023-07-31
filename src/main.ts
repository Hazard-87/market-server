import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('/api')
  app.use(cookieParser())

  // app.enableCors({
  //   origin: ['http://localhost:5173', '*'],
  //   methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  //   credentials: true
  // })
  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  const config = new DocumentBuilder()
    .setTitle('Market')
    .setDescription('API for Market-backend')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/swagger', app, document)

  await app.listen(8080)
}

bootstrap()
