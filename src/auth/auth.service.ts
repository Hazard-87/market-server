import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { CreateUserDto } from '../users/dto/create-user.dto'

@Injectable()
export class AuthService {
  constructor(private repository: UsersService, private jwtService: JwtService) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.repository.findOne(username)
    if (user?.password !== pass) {
      throw new UnauthorizedException()
    }
    const payload = { userId: user.id, username: user.username, roles: user.roles }
    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }

  async signOut(dto: CreateUserDto): Promise<any> {
    const user = await this.repository.create({ ...dto, roles: 'client' })
    const payload = { userId: user.id, username: user.username, roles: user.roles }
    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }
}
