import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './reservation.entity';
import { CreateReservationDto } from './create-reservation.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    private mailerService: MailerService,
  ) {}

  async create(dto: CreateReservationDto): Promise<Reservation> {
    const reservation = this.reservationRepository.create(dto);
    const saved = await this.reservationRepository.save(reservation);

    // Envoi de l'e-mail de confirmation
    await this.mailerService.sendMail({
      to: dto.email,
      subject: 'Confirmation de votre réservation',
      html: `
        <h2>Bonjour ${dto.nom},</h2>
        <p>Merci pour votre réservation.</p>
        <p><strong>Date :</strong> ${dto.date}</p>
        <p><strong>Heure :</strong> ${dto.heure}</p>
        <p>Nous vous contacterons si des précisions sont nécessaires.</p>
        <br/>
        <p>– L’équipe Ovrkode</p>
      `,
    });

    return saved;
  }

  findAll(): Promise<Reservation[]> {
    return this.reservationRepository.find();
  }

  findByEmail(email: string): Promise<Reservation[]> {
    return this.reservationRepository.find({
      where: { email },
      order: { date: 'ASC' },
    });
  }

  async delete(id: number): Promise<void> {
    await this.reservationRepository.delete(id);
  }
}
