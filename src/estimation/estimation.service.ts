import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateEstimationDto } from './dto/create-estimation.dto';

@Injectable()
export class EstimationService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEstimationEmail(data: CreateEstimationDto, pdfPath: string) {
    return this.mailerService.sendMail({
      to: 'admin@ovrkode.com',
      from: 'admin@ovrkode.com',
      subject: `📩 Nouvelle demande d'estimation - ${data.service || 'Service non précisé'}`,
      html: `
        <h2>Demande d’estimation</h2>
        <p><strong>Nom :</strong> ${data.nom}</p>
        <p><strong>Email :</strong> ${data.email}</p>
        <p><strong>Entreprise :</strong> ${data.entreprise || '-'}</p>
        <p><strong>Service souhaité :</strong> ${data.service}</p>
        <p><strong>Budget :</strong> ${data.budget || '-'}</p>
        <p><strong>Message :</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      `,
      attachments: [
        {
          filename: 'devis.pdf',
          path: pdfPath,
        },
      ],
    });
  }
}
