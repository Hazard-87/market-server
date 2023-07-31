import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { UsersService } from '../users/users.service'
import { LoginDto } from './dto/login.dto'

@Injectable()
export class AuthService {
  constructor(private repository: UsersService, private jwtService: JwtService) {}

  saltOrRounds = 10

  async signIn(username: string, pass: string, res: any): Promise<any> {
    const user = await this.repository.findOne(username)
    if (!user) {
      throw new UnauthorizedException('Неверный email или пароль')
    }

    const isMatch = await bcrypt.compare(pass, user.password)
    if (!isMatch) {
      throw new UnauthorizedException('Неверный email или пароль')
    }

    const payload = { userId: user.id, username: user.username, roles: user.roles }
    await this.setCookie(res, payload, user.id)
    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }

  async refresh(req: any, res: any): Promise<any> {
    const token = req.cookies['refreshToken']
    console.log(token)
    const decode = this.jwtService.decode(token) as any
    const currentTime = Date.now() / 1000
    if (decode.exp - currentTime < 0) {
      throw new UnauthorizedException('Невалидная сессия')
    }
    const user = await this.repository.findOneByToken(token)
    if (!user) {
      throw new UnauthorizedException('Невалидная сессия')
    }

    const payload = { userId: user.id, username: user.username, roles: user.roles }
    await this.setCookie(res, payload, user.id)
    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }

  async signOut(dto: LoginDto, res: any): Promise<any> {
    const candidate = await this.repository.findOne(dto.username)
    if (candidate) {
      throw new UnauthorizedException(
        `Пользователь с почтовым адресом ${dto.username} уже зарегистрирован`
      )
    }

    const hashPassword = await bcrypt.hash(dto.password, this.saltOrRounds)
    const user = await this.repository.create({ ...dto, password: hashPassword, roles: 'client' })
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
