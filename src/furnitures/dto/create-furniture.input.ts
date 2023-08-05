import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateFurnitureInput {
  @Field()
  name: string

  @Field()
  description: string
}
