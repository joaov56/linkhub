import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { User } from 'src/users/domain/user.entity';
import { Repository } from 'typeorm';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginUseCase {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
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

    const token = await this.jwtService.signAsync({ user });

    return {
      user,
      token,
    };
  }
}
