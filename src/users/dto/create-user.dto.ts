import { ApiProperty } from '@nestjs/swagger'
import { Column } from 'typeorm'

export class CreateUserDto {
  @ApiProperty()
  @Column()
  email: string

  @ApiProperty()
  @Column()
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
