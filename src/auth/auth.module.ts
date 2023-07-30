import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UsersModule } from '../users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './constants'

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s' }
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService
    //TODO: раскомментировать для защиты роутов
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard
    // }
  ],
  exports: [AuthService]
})
export class AuthModule {}