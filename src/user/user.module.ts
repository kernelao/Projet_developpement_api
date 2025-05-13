import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UpdateInfoService } from './update-info.service';
import { UpdatePasswordService } from './update-password.service';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UpdateInfoService, UpdatePasswordService],
  exports: [UserService],
  controllers: [UserController], // pour l'utiliser dans AuthService
})
export class UserModule {}
