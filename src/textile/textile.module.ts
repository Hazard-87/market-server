import { TextileEntity } from './entities/textile.entity'
import { Module } from '@nestjs/common'
import { TextileService } from './textile.service'
import { TextileController } from './textile.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ImageService } from '../image/image.service'
import { ImageEntity } from '../image/entities/image.entity'

@Module({
  imports: [TypeOrmModule.forFeature([TextileEntity, ImageEntity])],
  controllers: [TextileController],
  providers: [TextileService, ImageService]
})
export class TextileModule {}
