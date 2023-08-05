import { Module } from '@nestjs/common'
import { FurnituresService } from './furnitures.service'
import { FurnituresResolver } from './furnitures.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FurnitureEntity } from './entities/furniture.entity'

@Module({
  imports: [TypeOrmModule.forFeature([FurnitureEntity])],
  providers: [FurnituresResolver, FurnituresService]
})
export class FurnituresModule {}
