import { Module } from '@nestjs/common'
import { TextileTypesService } from './textile-types.service'
import { TextileTypesController } from './textile-types.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TextileTypeEntity } from './entities/textile-type.entity'

@Module({
  imports: [TypeOrmModule.forFeature([TextileTypeEntity])],
  controllers: [TextileTypesController],
  providers: [TextileTypesService]
})
export class TextileTypesModule {}
