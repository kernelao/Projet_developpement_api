import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';
import * as path from 'path';
import { CreateEstimationDto } from './dto/create-estimation.dto';

@Injectable()
export class DevisService {
  async genererDevis(data: CreateEstimationDto): Promise<string> {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const fileName = `devis_${Date.now()}.pdf`;
    const filePath = path.join(__dirname, '../../tmp', fileName);

    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    // ========== HEADER ==========
    // Logo (si tu veux, sinon remplace par texte)
    // doc.image('src/assets/logo.png', 50, 45, { width: 100 });

// ... mêmes imports et setup qu'avant ...

doc
  .fontSize(20)
  .text('Ovrkode', 50, 50, { align: 'left' })
  .fontSize(10)
  .text(`Date : ${new Date().toLocaleDateString('fr-FR')}`, { align: 'right' })
  .text(`Devis N° : ${Date.now()}`, { align: 'right' })
  .moveDown();

doc
  .moveTo(50, 100)
  .lineTo(550, 100)
  .strokeColor('#ccc')
  .stroke();

doc.moveDown().fontSize(18).text('Demande de devis', { align: 'center' }).moveDown(2);

doc.fontSize(12).font('Helvetica-Bold').text('Informations client :').moveDown(0.5);
doc.font('Helvetica')
  .text(`Nom complet : ${data.nom}`)
  .text(`Email : ${data.email}`)
  .text(`Entreprise : ${data.entreprise || '-'}`)
  .text(`Service demandé : ${data.service}`)
  .text(`Budget estimé : ${data.budget || '-'}`)
  .moveDown();

doc.fontSize(12).font('Helvetica-Bold').text('Message :').moveDown(0.5);
doc.font('Helvetica-Oblique').fontSize(11).text(data.message || '-', {
  width: 480,
  align: 'left',
});

doc.moveDown(4);
doc
  .fontSize(10)
  .fillColor('#888')
  .text('Ce devis est généré automatiquement par Ovrkode.', 50, 740, {
    align: 'center',
    width: 500,
});


    doc.end();

    // Retourne la promesse lorsque le stream est terminé
    return new Promise((resolve, reject) => {
      writeStream.on('finish', () => resolve(filePath));
      writeStream.on('error', reject);
    });
  }
}
