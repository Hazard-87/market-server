import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CreateTextileTypeDto } from './create-textile-type.dto'

export class UpdateTextileTypeDto extends PartialType(CreateTextileTypeDto) {
  @ApiProperty()
  name: string
}
