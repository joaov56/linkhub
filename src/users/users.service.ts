import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

import { sign, verify } from 'jsonwebtoken';
import { hash, compare } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPass = await hash(createUserDto.password, 10);

    return this.usersRepository.save({
      ...createUserDto,
      password: hashedPass,
    });
  }

  async login(
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

  async checkToken(token: string) {
    try {
      const splited = token.split('Bearer ')[1];

      const decoded = await verify(splited, 'secret');

      return decoded.user;
    } catch (error) {
      return {};
    }
  }

  findOne(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }
}
