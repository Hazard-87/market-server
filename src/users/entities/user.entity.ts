import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

export enum UserRoles {
  CLIENT = 'client',
  ADMIN = 'admin'
}

@Entity('users')
export class UserEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number

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

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: UserRoles,
    default: UserRoles.ADMIN
  })
  roles: UserRoles

  @ApiProperty()
  @Column({
    nullable: true
  })
  refresh_token: string
}
