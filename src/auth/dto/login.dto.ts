import { LoginRequest } from '@app/interface/auth';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginRequestDto implements LoginRequest {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(50)
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  toString(): string {
    return JSON.stringify({
      email: this.email,
      password: this.password,
    });
  }
}
