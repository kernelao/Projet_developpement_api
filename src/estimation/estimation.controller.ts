import { Body, Controller, Post } from '@nestjs/common';
import { EstimationService } from './estimation.service';
import { CreateEstimationDto } from './dto/create-estimation.dto';
import { DevisService } from './devis.service';
import * as fs from 'fs/promises';

@Controller('estimation')
export class EstimationController {
  constructor(
    private readonly estimationService: EstimationService,
    private readonly devisService: DevisService,
  ) {}

  @Post()
  async sendEstimation(@Body() dto: CreateEstimationDto) {
    // 1. Générer le PDF du devis
    const filePath = await this.devisService.genererDevis(dto);

    // 2. Envoyer l'email avec le PDF en pièce jointe
    await this.estimationService.sendEstimationEmail(dto, filePath);

    // 3. Supprimer le fichier temporaire après envoi
    await fs.unlink(filePath);

    // 4. Retourner la réponse à l'utilisateur
    return { message: 'Estimation envoyée avec succès, devis généré.' };
  }
}
