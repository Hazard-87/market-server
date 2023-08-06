import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { ImageEntity } from '../../image/entities/image.entity'

@Entity('textiles')
export class TextileEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty()
  @Column()
  name: string

  @ApiProperty()
  @Column()
  vendorCode: string

  @ApiProperty()
  @Column()
  width: number

  @ApiProperty()
  @Column()
  material: string

  @ApiProperty()
  @Column()
  manufacturer: string

  @ApiProperty()
  @Column()
  price: number

  @ApiProperty({ type: Number })
  @Column({
    type: 'integer',
    nullable: false
  })
  textileTypeId: number

  @ApiProperty({ type: [ImageEntity] })
  @Column({
    type: 'integer',
    array: true,
    default: [],
    nullable: false
  })
  images: number[]
}
