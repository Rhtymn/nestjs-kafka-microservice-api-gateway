import { RegisterRequest } from '@app/interface/auth';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterRequestDto implements RegisterRequest {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(50)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  username: string;

  toString() {
    return JSON.stringify({
      email: this.email,
      password: this.password,
      username: this.username,
    });
  }
}
