import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { User } from 'src/users/domain/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<User> {
    const hashedPass = await hash(createUserDto.password, 10);

    return this.usersRepository.save({
      ...createUserDto,
      password: hashedPass,
    });
  }
}
