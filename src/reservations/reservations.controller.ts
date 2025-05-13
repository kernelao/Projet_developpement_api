import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './create-reservation.dto';
import { Reservation } from './reservation.entity';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {
    console.log('✅ ReservationsController chargé');
  }

  @Post()
  async create(@Body() dto: CreateReservationDto): Promise<Reservation> {
    return this.reservationsService.create(dto);
  }

  @Get()
  findAll(): Promise<Reservation[]> {
    return this.reservationsService.findAll();
  }

  @Get('by-email/:email')
  findByEmail(@Param('email') email: string): Promise<Reservation[]> {
    return this.reservationsService.findByEmail(email);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.reservationsService.delete(id);
  }
}
