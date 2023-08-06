import { ApiProperty } from '@nestjs/swagger'
import { Column } from 'typeorm'

export class UpdateTextileDto {
  @ApiProperty()
  @Column({ nullable: true })
  name: string

  @ApiProperty()
  @Column({ nullable: true })
  vendorCode: string

  @ApiProperty()
  @Column({ nullable: true })
  width: number

  @ApiProperty()
  @Column({ nullable: true })
  material: string

  @ApiProperty()
  @Column({ nullable: true })
  manufacturer: string

  @ApiProperty()
  @Column({ nullable: true })
  price: number

  @ApiProperty()
  @Column({ nullable: true })
  textileTypeId: number

  @ApiProperty()
  @Column({ nullable: true })
  images: number[]
}
