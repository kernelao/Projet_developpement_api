import { Body, Controller, Post } from '@nestjs/common';
import { EstimationService } from './estimation.service';
import { CreateEstimationDto } from './dto/create-estimation.dto';

@Controller('estimation')
export class EstimationController {
  constructor(private readonly estimationService: EstimationService) {}

  @Post()
  sendEstimation(@Body() dto: CreateEstimationDto) {
    return this.estimationService.sendEstimationEmail(dto);
  }
}
