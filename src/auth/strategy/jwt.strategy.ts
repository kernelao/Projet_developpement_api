  import { Injectable } from '@nestjs/common';
  import { PassportStrategy } from '@nestjs/passport';
  import { ExtractJwt, Strategy } from 'passport-jwt';

  @Injectable()
  export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: process.env.JWT_SECRET || 'super-secret-key',
      });

      console.log('✅ JwtStrategy loaded'); // ✅ maintenant OK ici
    }

    async validate(payload: any) {
      console.log('✅ JWT payload reçu :', payload); // ← ça doit s'afficher si le token est bon
      return { id: payload.sub, email: payload.email };
    }
  }
