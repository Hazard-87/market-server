import { ApiProperty } from '@nestjs/swagger'
import { ImageEntity } from '../../image/entities/image.entity'
import { Column } from 'typeorm'

export class CreateTextileDto {
  @ApiProperty()
  name: string

  @ApiProperty()
  vendorCode: string

  @ApiProperty()
  width: string

  @ApiProperty()
  material: string

  @ApiProperty()
  price: number

  @ApiProperty()
  textileTypeID: number

  @ApiProperty()
  images: number[]
}

export class QueryArg {
  @ApiProperty({ required: false, type: Number, isArray: true })
  id: number | number[]

  @ApiProperty({
    required: false,
    oneOf: [{ type: 'number' }, { type: 'all' }]
  })
  limit: number

  @ApiProperty({ required: false })
  offset: number
}
