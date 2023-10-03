import { ApiProperty } from '@nestjs/swagger'
import { Column } from 'typeorm'
import { UserRoles } from '../entities/user.entity'

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

  @ApiProperty()
  @Column({ type: 'enum', enum: UserRoles, nullable: true })
  roles: UserRoles
}
