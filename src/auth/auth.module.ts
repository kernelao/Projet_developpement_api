import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport'; // 👈 À ajouter
import { JwtStrategy } from './strategy/jwt.strategy'; // 👈 À ajouter
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    PassportModule, // 👈 À ajouter
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'super-secret-key', // utilise .env ou fallback
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // 👈 Ajout de JwtStrategy
  exports: [AuthService], // 👈 Pour être utilisé ailleurs
})
export class AuthModule {}
