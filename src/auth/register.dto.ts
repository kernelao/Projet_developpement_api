import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
    IsMobilePhone,
  } from 'class-validator';
  
  export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    username: string;
    
    @IsNotEmpty()
    @IsString()
    nom: string;
  
    @IsNotEmpty()
    @IsString()
    prenom: string;
  
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @MinLength(6)
    password: string;
  
    @IsMobilePhone('fr-CA') // selon région
    telephone: string;
  
    @IsOptional()
    @IsString()
    entreprise?: string;
  }
  