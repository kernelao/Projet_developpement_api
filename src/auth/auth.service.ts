import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../user/user.service';
import { RegisterDto } from './register.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const { password, ...rest } = data;
    return this.userService.create({
      ...rest,
      password: hashedPassword,
    });
  }

  async login(identifiant: string, password: string) {
    // Essaye d’abord par email
    let user = await this.userService.findByEmail(identifiant);

    // Si non trouvé, essaie par username
    if (!user) {
      user = await this.userService.findByUsername(identifiant);
    }

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      username: user.username,
    };

    return {
      token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        username: user.username,
      },
    };
  }
}
