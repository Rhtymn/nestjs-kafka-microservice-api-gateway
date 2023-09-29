import { ValidateTokenRequest } from '@app/interface/auth';
import { IsJWT, IsNotEmpty } from 'class-validator';

export class ValidateTokenRequestDto implements ValidateTokenRequest {
  @IsNotEmpty()
  @IsJWT()
  token: string;

  toString(): string {
    return JSON.stringify({
      token: this.token,
    });
  }
}
