import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Link } from 'src/links/domain/link.entity';
import { CreateLinkDto } from 'src/links/dto/create-link.dto';
import { User } from 'src/users/domain/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeleteLinkUseCase {
  constructor(
    @InjectRepository(Link)
    private linksRepository: Repository<Link>,
  ) {}

  async execute(id: string) {
    return this.linksRepository.delete(id);
  }
}
