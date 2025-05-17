import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { MailerService } from '@nestjs-modules/mailer';
import { UserService } from '../user/user.service';
import { RegisterDto } from './register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async register(data: RegisterDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const verificationToken = uuidv4();
    const { password, ...rest } = data;

    try {
      const user = await this.userService.create({
        ...rest,
        password: hashedPassword,
        isVerified: false,
        verificationToken,
      });

      const verificationLink = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;

      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Confirmez votre adresse e-mail',
        html: `
          <p>Bonjour ${user.prenom},</p>
          <p>Merci pour votre inscription. Cliquez sur le lien ci-dessous pour activer votre compte :</p>
          <p><a href="${verificationLink}">Activer mon compte</a></p>
          <p>Ce lien expirera dans 24h.</p>
        `,
      });

      return {
        message: "Un e-mail de confirmation a été envoyé. Veuillez vérifier votre boîte de réception.",
      };
    } catch (error) {
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

    if (!user.isVerified) {
      throw new UnauthorizedException('Veuillez vérifier votre adresse e-mail avant de vous connecter.');
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

  async verifyEmail(token: string) {
    console.log('🔍 Vérification du token reçu :', token);

    const user = await this.userService.findByVerificationToken(token);
    console.log('👤 Utilisateur trouvé :', user);

    if (!user) {
      console.warn("🔴 Aucun utilisateur trouvé pour ce token.");
      return {
        success: false,
        message: 'Lien de vérification invalide ou déjà utilisé.',
      };
    }

    if (user.isVerified && !user.verificationToken) {
      console.info("✅ Compte déjà vérifié.");
      return {
        success: true,
        message: 'Votre compte est déjà vérifié.',
      };
    }

    user.isVerified = true;
    user.verificationToken = null;

    await this.userService.save(user);

    console.log("✅ Vérification du compte :", user.email);

    return {
      success: true,
      message: 'Votre compte a bien été vérifié.',
    };
  }

  async resendVerification(email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException("Utilisateur introuvable.");
    }

    if (user.isVerified) {
      return { message: "Ce compte est déjà vérifié." };
    }

    const newToken = user.verificationToken || uuidv4();
    user.verificationToken = newToken;
    await this.userService.save(user);

    const verificationLink = `${process.env.FRONTEND_URL}/verify-email/${newToken}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Nouveau lien de vérification',
      html: `
        <p>Bonjour ${user.prenom},</p>
        <p>Cliquez sur le lien ci-dessous pour activer votre compte :</p>
        <p><a href="${verificationLink}">Activer mon compte</a></p>
        <p>Ce lien expirera dans 24h.</p>
      `,
    });

    return {
      message: "Un nouvel e-mail de vérification a été envoyé.",
    };
  }
}
