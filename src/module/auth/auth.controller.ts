import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserToken } from '../../../dist/module/auth/models/UserToken.d';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/is-public.decorator';
import { LoginRequestBody } from './models/LoginRequestBody';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('admin/login')
  @HttpCode(HttpStatus.OK)
  async adminLogin(@Body() user: LoginRequestBody): Promise<UserToken> {
    return this.authService.adminLogin(user);
  }

  @IsPublic()
  @Post('user/login')
  @HttpCode(HttpStatus.OK)
  async userLogin(@Body() user: LoginRequestBody): Promise<UserToken> {
    return this.authService.userLogin(user);
  }
}
