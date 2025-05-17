import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../user/user.service';
import { RegisterDto } from './register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: RegisterDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const { password, ...rest } = data;

    try {
      const user = await this.userService.create({
        ...rest,
        password: hashedPassword,
      });

      const payload = {
        sub: user.id,
        email: user.email,
      };

      return {
        token: this.jwtService.sign(payload),
        user: {
          id: user.id,
          nom: user.nom,
          prenom: user.prenom,
          email: user.email,
        },
      };
    } catch (error) {
      // 🔥 Gestion propre du conflit d'unicité (username/email)
      if (error.code === '23505') {
        throw new ConflictException('Nom d’utilisateur ou email déjà utilisé.');
      }
      throw error;
    }
  }

  async login(identifiant: string, password: string) {
    let user = await this.userService.findByEmail(identifiant);
    if (!user) user = await this.userService.findByUsername(identifiant);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };

    return {
      token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
      },
    };
  }
}
