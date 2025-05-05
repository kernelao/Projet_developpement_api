import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  identifiant: string; // peut être email ou username

  @MinLength(6)
  password: string;
}
