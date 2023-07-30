import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { LoginDto } from './dto/login.dto'

@Injectable()
export class AuthService {
  constructor(private repository: UsersService, private jwtService: JwtService) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.repository.findOne(username)
    if (user?.password !== pass) {
      throw new UnauthorizedException()
    }

    return await this.getTokens(user)
  }

  async refresh(token: string): Promise<any> {
    const decode = this.jwtService.decode(token) as any
    const currentTime = Date.now() / 1000
    if (decode.exp - currentTime < 0) {
      throw new UnauthorizedException()
    }

    const user = await this.repository.findOneByToken(token)
    if (!user) {
      throw new UnauthorizedException()
    }

    return await this.getTokens(user)
  }

  async signOut(dto: LoginDto): Promise<any> {
    const user = await this.repository.create({ ...dto, roles: 'client' })

    return this.getTokens(user)
  }

  async getTokens(user: any) {
    const payload = { userId: user.id, username: user.username, roles: user.roles }
    const at = await this.jwtService.signAsync(payload)
    const rt = await this.jwtService.signAsync(payload, {
      expiresIn: '600s'
    })

    await this.repository.updateRT(user.id, {
      refresh_token: rt
    })

    return {
      access_token: at,
      refresh_token: rt
    }
  }
}
