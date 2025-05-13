// src/support/dto/support.dto.ts
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SupportDto {
  @IsNotEmpty()
  nom: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  sujet: string;

  @IsNotEmpty()
  message: string;
}
