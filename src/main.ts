import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('/api')

  app.enableCors({
    origin: ['http://localhost:5173', '*'],
    allowedHeaders: ['Accept', 'Content-Type'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true
  })

  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.use(cookieParser())

  const config = new DocumentBuilder()
    .setTitle('Market')
    .setDescription('API for Market-backend')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/swagger', app, document)

  await app.listen(8080)
}

bootstrap()
