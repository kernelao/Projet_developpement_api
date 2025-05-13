import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { User } from './user.entity';

@Injectable()
export class UpdateInfoService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async update(userId: number, dto: UpdateUserInfoDto) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('Utilisateur introuvable');

    user.prenom = dto.prenom;
    user.nom = dto.nom;
    user.email = dto.email;

    await this.userRepository.save(user);
    return { message: 'Informations mises à jour.' };
  }
}
