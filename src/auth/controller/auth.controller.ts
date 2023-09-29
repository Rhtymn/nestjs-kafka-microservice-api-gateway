import {
  LoginResponse,
  RegisterResponse,
  User as UserPayload,
  UserRole,
} from '@app/interface/auth';
import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  Param,
  ParseEnumPipe,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { RegisterRequestDto } from '../dto/register.dto';
import { LoginRequestDto } from '../dto/login.dto';
import { Response } from 'express';
import { User } from '../../decorator/user.decorator';
import { Public } from 'src/decorator/public.decorator';
import { Roles } from 'src/guard/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register/:role')
  async register(
    @Body() registerRequest: RegisterRequestDto,
    @Param('role', new ParseEnumPipe(UserRole)) role: UserRole,
    @Res() res: Response,
  ): Promise<Response<RegisterResponse>> {
    const response = await this.authService.register({
      ...registerRequest,
      role,
    });
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

  @Roles(UserRole.ADMIN, UserRole.OWNER, UserRole.SALES)
  @Get('me')
  async me(@User() user: UserPayload): Promise<UserPayload> {
    return user;
  }
}
