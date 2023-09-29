import { Injectable, HttpStatus, Inject, OnModuleInit } from '@nestjs/common';
import { RegisterRequestDto } from '../dto/register.dto';
import { AUTH_SERVICE_CLIENT } from '@app/constants';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import {
  LoginResponse,
  RegisterResponse,
  ValidateTokenResponse,
} from '@app/interface/auth';
import { LoginRequestDto } from '../dto/login.dto';
import { ValidateTokenRequestDto } from '../dto/validate-token.dto';

@Injectable()
export class AuthService implements OnModuleInit {
  @Inject(AUTH_SERVICE_CLIENT)
  private readonly authClient: ClientKafka;

  async register(
    registerRequest: RegisterRequestDto,
  ): Promise<RegisterResponse> {
    try {
      const res: RegisterResponse = await lastValueFrom(
        this.authClient.send('register', registerRequest),
      );

      return res;
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: ['Internal server error'],
      };
    }
  }

  async login(loginRequest: LoginRequestDto): Promise<LoginResponse> {
    try {
      const res: LoginResponse = await lastValueFrom(
        this.authClient.send('login', loginRequest),
      );

      return res;
    } catch (e) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: ['Internal server error'],
        token: null,
      };
    }
  }

  async validateToken(
    token: ValidateTokenRequestDto,
  ): Promise<ValidateTokenResponse> {
    try {
      const res: ValidateTokenResponse = await lastValueFrom(
        this.authClient.send('validate-token', token),
      );

      return res;
    } catch (e) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: ['Internal server error'],
        payload: null,
      };
    }
  }

  onModuleInit() {
    this.authClient.subscribeToResponseOf('register');
    this.authClient.subscribeToResponseOf('login');
    this.authClient.subscribeToResponseOf('validate-token');
  }
}
