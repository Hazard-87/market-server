import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Request
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { Public } from '../roles/public.decorator'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { ApiTags } from '@nestjs/swagger'
import { UsersService } from '../users/users.service'
import { UpdateUserDto } from '../users/dto/update-user.dto'

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: UsersService) {}

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

  @Patch('profile')
  updateProfile(@Request() req, @Body() dto: UpdateUserDto) {
    return this.userService.update(req.user.userId, dto)
  }

  @Delete('profile')
  removeProfile(@Request() req) {
    return this.userService.remove(req.user.userId)
  }

  @Public()
  @Post('registration')
  createProfile(@Body() dto: CreateUserDto) {
    return this.authService.signOut(dto)
  }
}
