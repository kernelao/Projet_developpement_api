// src/support/support.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { SupportService } from './support.service';
import { SupportDto } from './dto/support.dto';

@Controller('support')
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @Post()
  sendSupport(@Body() dto: SupportDto) {
    return this.supportService.sendSupportEmail(dto);
  }
}
