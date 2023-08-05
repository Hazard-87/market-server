import { ArgsType, Field, Int } from '@nestjs/graphql'
import { Max, Min } from 'class-validator'

@ArgsType()
export class FurnituresArgs {
  @Field((type) => Int)
  @Min(0)
  offset = 0

  @Field((type) => Int)
  @Min(1)
  @Max(50)
  limit = 25
}
