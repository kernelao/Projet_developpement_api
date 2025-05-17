import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  async create(user: Partial<User>) {
    const newUser = this.repo.create(user);
    return await this.repo.save(newUser);
  }

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  findByUsername(username: string) {
    return this.repo.findOne({ where: { username } });
  }

  async updateInfo(userId: number, updateDto: UpdateUserInfoDto) {
    const user = await this.repo.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    user.prenom = updateDto.prenom;
    user.nom = updateDto.nom;
    user.email = updateDto.email;

    if (updateDto.username) {
      user.username = updateDto.username;
    }

    return this.repo.save(user);
  }

  // ✅ méthode ajoutée pour trouver un utilisateur par token de vérification
  findByVerificationToken(token: string) {
    return this.repo.findOne({ where: { verificationToken: token } });
  }

  // ✅ méthode pour sauvegarder un utilisateur modifié (utile dans verifyEmail)
  save(user: User) {
    return this.repo.save(user);
  }
}
