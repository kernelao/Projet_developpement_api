import {
  Controller,
  Get,
  Patch,
  Body,
  Req,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateInfoService } from './update-info.service';
import { UpdatePasswordService } from './update-password.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly updateInfoService: UpdateInfoService,
    private readonly updatePasswordService: UpdatePasswordService
  ) {}

  @Patch('update-info')
  @UseGuards(AuthGuard('jwt'))
  updateInfo(@Body() dto: UpdateUserInfoDto, @Req() req) {
     console.log('🧾 Utilisateur connecté :', req.user);
    return this.updateInfoService.update(req.user.id, dto); // 👈 ici
  }

  @Patch('update-password')
  @UseGuards(AuthGuard('jwt'))
  updatePassword(@Body() dto: UpdateUserPasswordDto, @Req() req) {
    return this.updatePasswordService.change(req.user.id, dto); // 👈 ici aussi
  }
  @Get('test-token')
testToken(@Req() req) {
  console.log('📦 req.headers.authorization =', req.headers.authorization);
  return { token: req.headers.authorization };
}

}
