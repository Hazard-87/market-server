import { ApiProperty } from '@nestjs/swagger'

export class CreateTextileDto {
  @ApiProperty()
  name: string

  @ApiProperty()
  vendorCode: string

  @ApiProperty()
  width: number

  @ApiProperty()
  material: string

  @ApiProperty()
  manufacturer: string

  @ApiProperty()
  price: number

  @ApiProperty()
  textileTypeId: number

  @ApiProperty()
  images: number[]
}

export class QueryArg {
  @ApiProperty({ required: false, type: Number })
  id: number

  @ApiProperty({ required: false, type: Number, isArray: true })
  textileTypeId: number

  @ApiProperty({
    required: false,
    oneOf: [{ type: 'number' }, { type: 'all' }]
  })
  limit: number

  @ApiProperty({ required: false })
  offset: number
}
