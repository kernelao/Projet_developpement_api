// src/support/support.module.ts
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { SupportController } from './support.controller';
import { SupportService } from './support.service';
import { SupportDto } from './dto/support.dto';

@Module({
  controllers: [SupportController],
  providers: [SupportService],
})
export class SupportModule {}
