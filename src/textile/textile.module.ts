import { TextileEntity } from './entities/textile.entity'
import { Module } from '@nestjs/common'
import { TextileService } from './textile.service'
import { TextileController } from './textile.controller'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([TextileEntity])],
  controllers: [TextileController],
  providers: [TextileService]
})
export class TextileModule {}
