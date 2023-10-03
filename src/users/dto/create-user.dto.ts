import { ApiProperty } from '@nestjs/swagger'
import { Column } from 'typeorm'
import { TRoles } from '../../decorators/roles.decorator'
import { UserRoles } from '../entities/user.entity'

export class CreateUserDto {
  @ApiProperty()
  @Column()
  email: string

  @ApiProperty()
  @Column()
  password: string

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: UserRoles
  })
  roles: UserRoles

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
