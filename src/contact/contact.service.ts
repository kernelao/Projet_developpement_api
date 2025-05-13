import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  constructor(private readonly mailerService: MailerService) {}

  async sendContactEmail(data: CreateContactDto) {
    return this.mailerService.sendMail({
      to: 'admin@ovrkode.com', // 📩 Destinataire
      from: 'admin@ovrkode.com', // 🛑 doit être le même que l'auth SMTP
      subject: `📩 Nouveau message de contact - ${data.sujet}`,
      text: data.message,
      html: `
        <h2>Message de contact</h2>
        <p><strong>Nom :</strong> ${data.nom}</p>
        <p><strong>Email :</strong> ${data.email}</p>
        <p><strong>Sujet :</strong> ${data.sujet}</p>
        <p><strong>Message :</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      `,
    });
  }
}
