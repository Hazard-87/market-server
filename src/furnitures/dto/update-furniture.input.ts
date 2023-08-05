import { Field, ID, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateFurnitureInput {
  @Field(() => ID)
  id: number

  @Field({ nullable: true })
  name: string

  @Field({ nullable: true })
  description: string
}
