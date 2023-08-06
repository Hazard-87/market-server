import { ApiProperty } from '@nestjs/swagger'

export class CreateTextileTypeDto {
  @ApiProperty()
  name: string
}
