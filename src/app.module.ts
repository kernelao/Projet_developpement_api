import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ReservationsModule } from './reservations/reservations.module';
import { SupportModule } from './support/support.module';
import { ContactModule } from './contact/contact.module';
import { EstimationModule } from './estimation/estimation.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'symfony',
      password: 'secret',
      database: 'monapi',
      synchronize: true,
      autoLoadEntities: true,
    }),

    MailerModule.forRoot({
      transport: {
        host: 'smtppro.zohocloud.ca',
        port: 465,
        secure: true, // SSL (port 465)
        auth: {
          user: process.env.ZOHO_USER,
          pass: process.env.ZOHO_PASS,
        },
      },
      defaults: {
        from: '"Ovrkode Support" <admin@ovrkode.com>',
      },
    }),

    AuthModule,
    UserModule,
    ReservationsModule,
    SupportModule,
    ContactModule,
    EstimationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
