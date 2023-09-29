import {
  LoginResponse,
  RegisterResponse,
  User as UserPayload,
} from '@app/interface/auth';
import { Controller, Post, Body, Res, Get } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { RegisterRequestDto } from '../dto/register.dto';
import { LoginRequestDto } from '../dto/login.dto';
import { Response } from 'express';
import { User } from '../../decorator/user.decorator';
import { Public } from 'src/decorator/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(
    @Body() registerRequest: RegisterRequestDto,
    @Res() res: Response,
  ): Promise<Response<RegisterResponse>> {
    const response = await this.authService.register(registerRequest);
    return res.status(response.status).json(response);
  }

  @Public()
  @Post('login')
  async login(
    @Body() loginRequest: LoginRequestDto,
    @Res() res: Response,
  ): Promise<Response<LoginResponse>> {
    const response = await this.authService.login(loginRequest);
    return res.status(response.status).json(response);
  }

  @Get('me')
  async me(@User() user: UserPayload): Promise<UserPayload> {
    return user;
  }
}
