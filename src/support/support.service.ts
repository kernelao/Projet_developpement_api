// src/support/support.service.ts
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SupportDto } from './dto/support.dto';

@Injectable()
export class SupportService {
  constructor(private readonly mailerService: MailerService) {}

  async sendSupportEmail(data: SupportDto) {
    return this.mailerService.sendMail({
      to: 'admin@ovrkode.com',
      from: 'admin@ovrkode.com',
      subject: `Demande de support - ${data.sujet}`,
      text: data.message,
      html: `
        <h3>Nouvelle demande de support</h3>
        <p><strong>Nom:</strong> ${data.nom}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Sujet:</strong> ${data.sujet}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `,
    });
  }
}
