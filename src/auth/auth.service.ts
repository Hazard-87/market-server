import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { LoginDto } from './dto/login.dto'

@Injectable()
export class AuthService {
  constructor(private repository: UsersService, private jwtService: JwtService) {}

  async signIn(username: string, pass: string, res: any): Promise<any> {
    const user = await this.repository.findOne(username)
    if (user?.password !== pass) {
      throw new UnauthorizedException()
    }
    const payload = { userId: user.id, username: user.username, roles: user.roles }
    await this.setCookie(res, payload, user.id)
    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }

  async refresh(req: any, res: any): Promise<any> {
    const token = req.cookies['refreshToken']

    const decode = this.jwtService.decode(token) as any
    const currentTime = Date.now() / 1000
    if (decode.exp - currentTime < 0) {
      throw new UnauthorizedException()
    }
    const user = await this.repository.findOneByToken(token)
    if (!user) {
      throw new UnauthorizedException()
    }

    const payload = { userId: user.id, username: user.username, roles: user.roles }
    await this.setCookie(res, payload, user.id)
    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }

  async signOut(dto: LoginDto, res: any): Promise<any> {
    const user = await this.repository.create({ ...dto, roles: 'client' })
    const payload = { userId: user.id, username: user.username, roles: user.roles }
    await this.setCookie(res, payload, user.id)
    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }

  async setCookie(res: any, payload: any, userId: number) {
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '600s'
    })
    await this.repository.updateRT(userId, {
      refresh_token: token
    })

    res.cookie('refreshToken', token, {
      sameSite: 'strict',
      httpOnly: true
    })
  }
}
