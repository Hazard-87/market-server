import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Public } from '../roles/public.decorator'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password)
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user
  }
}
