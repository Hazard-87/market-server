import { ApiProperty } from '@nestjs/swagger'
import { Column } from 'typeorm'

export class UpdateUserDto {
  @ApiProperty()
  @Column({ nullable: true })
  email: string

  @ApiProperty()
  @Column({ nullable: true })
  password: string

  @ApiProperty()
  @Column({ nullable: true })
  firstname: string

  @ApiProperty()
  @Column({ nullable: true })
  lastname: string

  @ApiProperty()
  @Column({ nullable: true })
  phone: string
}
