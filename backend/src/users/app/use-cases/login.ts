import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { User } from 'src/users/domain/user.entity';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';

@Injectable()
export class LoginUseCase {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async execute(
    email: string,
    password: string,
  ): Promise<{ user: User; token: string } | null> {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    const isValid = await compare(password, user.password);

    if (!isValid) {
      return null;
    }

    const token = await sign({ user }, 'secret', { expiresIn: '1d' });

    return {
      user,
      token,
    };
  }
}
