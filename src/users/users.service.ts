import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserEntity } from './entities/user.entity'
import { RefreshDto } from '../auth/dto/refresh.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>
  ) {}

  create(dto: CreateUserDto) {
    return this.repository.save(dto)
  }

  async findOne(username: string): Promise<UserEntity | undefined> {
    return this.repository.findOneBy({
      username
    })
  }

  async findOneByToken(token: string): Promise<UserEntity | undefined> {
    return this.repository.findOneBy({
      refresh_token: token
    })
  }

  update(id: number, dto: UpdateUserDto) {
    return this.repository.update(id, dto)
  }

  updateRT(id: number, dto: RefreshDto) {
    return this.repository.update(id, dto)
  }

  remove(id: number) {
    return this.repository.delete(id)
  }
}
