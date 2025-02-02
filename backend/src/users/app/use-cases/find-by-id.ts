import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/domain/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindByIdUseCase {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async execute(id: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { id },
    });
  }
}
