import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

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

}
