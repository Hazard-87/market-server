import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { FurnituresService } from './furnitures.service'
import { FurnitureEntity } from './entities/furniture.entity'
import { CreateFurnitureInput } from './dto/create-furniture.input'
import { UpdateFurnitureInput } from './dto/update-furniture.input'
import { FurnituresArgs } from './dto/furnitures.args'

@Resolver('Furniture')
export class FurnituresResolver {
  constructor(private readonly furnituresService: FurnituresService) {}

  @Mutation(() => FurnitureEntity)
  createFurniture(@Args('createFurnitureInput') createFurnitureInput: CreateFurnitureInput) {
    return this.furnituresService.create(createFurnitureInput)
  }

  @Query(() => FurnitureEntity)
  getOneFurniture(@Args('id') id: number): Promise<FurnitureEntity> {
    return this.furnituresService.findOneById(id)
  }

  @Query((returns) => [FurnitureEntity])
  getAllFurnitures(@Args() args: FurnituresArgs) {
    return this.furnituresService.findAll(args)
  }

  @Mutation(() => FurnitureEntity)
  updateFurniture(@Args('updateFurnitureInput') updateFurnitureInput: UpdateFurnitureInput) {
    return this.furnituresService.update(updateFurnitureInput.id, updateFurnitureInput)
  }

  @Mutation(() => FurnitureEntity)
  removeFurniture(@Args('id', { type: () => Int }) id: number) {
    return this.furnituresService.remove(id)
  }
}
