import { ApiProperty } from '@nestjs/swagger'
import { Column } from 'typeorm'
import { ImageEntity } from '../../image/entities/image.entity'

export class UpdateTextileDto {
  @ApiProperty()
  @Column({ nullable: true })
  name: string

  @ApiProperty()
  @Column({ nullable: true })
  vendorCode: string

  @ApiProperty()
  @Column({ nullable: true })
  width: string

  @ApiProperty()
  @Column({ nullable: true })
  material: string

  @ApiProperty()
  @Column({ nullable: true })
  price: number

  @ApiProperty()
  @Column({ nullable: true })
  textileTypeID: number

  @ApiProperty()
  @Column({ nullable: true })
  images: number[]
}
