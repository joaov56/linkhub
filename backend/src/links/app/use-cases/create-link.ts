import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Link } from 'src/links/domain/link.entity';
import { CreateLinkDto } from 'src/links/dto/create-link.dto';
import { User } from 'src/users/domain/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CreateLinkUseCase {
  constructor(
    @InjectRepository(Link)
    private linksRepository: Repository<Link>,
  ) {}

  async execute(createLinkDto: CreateLinkDto, user: User): Promise<Link> {
    console.log(user.id);

    return this.linksRepository.save({
      ...createLinkDto,
      userId: user.id,
    });
  }
}
