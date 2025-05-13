import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './register.dto';
import { LoginDto } from './login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const { token, user } = await this.authService.login(dto.identifiant, dto.password);
    return {
      token,
      user: {
        prenom: user.prenom,
        nom: user.nom,
        email: user.email,
      },
    };
  }
}
