import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/domain/user.entity';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async execute(id: string, updateUserDto: UpdateUserDto) {
    if(updateUserDto.username){
      const user = await this.usersRepository.findOne({where :{
        username: updateUserDto.username
      }});
      if(user){
        throw new Error('Username already exists');
      } 
    } 
    return this.usersRepository.update(id, updateUserDto);
  }
}
