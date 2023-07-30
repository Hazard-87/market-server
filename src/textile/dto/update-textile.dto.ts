// import { PartialType } from '@nestjs/mapped-types'
import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CreateTextileDto } from './create-textile.dto'

export class UpdateTextileDto extends PartialType(CreateTextileDto) {
  @ApiProperty()
  name: string

  @ApiProperty()
  description: string

  @ApiProperty()
  price: number

  @ApiProperty()
  image: string
}
