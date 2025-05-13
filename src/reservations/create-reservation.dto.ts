// src/reservations/dto/create-reservation.dto.ts
import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateReservationDto {
  @IsNotEmpty()
  @IsString()
  nom: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  service: string;

  @IsNotEmpty()
  @IsString()
  date: string; // format ISO string

  @IsNotEmpty()
  @IsString()
  heure: string; // 👈 AJOUTÉ

  @IsOptional()
  @IsString()
  message?: string; // 👈 Optionnel pour l’email
}
