import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

@Entity('users')
export class UserEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty()
  @Column()
  username: string

  @ApiProperty()
  @Column()
  password: string

  @ApiProperty()
  @Column()
  roles: string

  @ApiProperty()
  @Column({
    nullable: true
  })
  refresh_token: string
}