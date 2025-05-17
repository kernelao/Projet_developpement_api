import { Module } from '@nestjs/common';
import { EstimationService } from './estimation.service';
import { EstimationController } from './estimation.controller';
import { DevisService } from './devis.service';

@Module({
  controllers: [EstimationController],
  providers: [EstimationService, DevisService],
})
export class EstimationModule {}
