import { RegisterRequest, UserRole } from '@app/interface';

export class RegisterRequestEvent implements RegisterRequest {
  email: string;
  password: string;
  username: string;
  role: UserRole;

  constructor(registerRequest: RegisterRequest) {
    this.email = registerRequest.email;
    this.password = registerRequest.password;
    this.username = registerRequest.username;
    this.role = registerRequest.role;
  }

  toString() {
    return JSON.stringify({
      email: this.email,
      password: this.password,
      username: this.username,
      role: this.role,
    });
  }
}
