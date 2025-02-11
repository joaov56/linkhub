import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Link } from 'src/links/domain/link.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindLinksByUserIdUseCase {
  constructor(
    @InjectRepository(Link)
    private linksRepository: Repository<Link>,
  ) {}

  async execute(id: string): Promise<Link[] | null> {    
    return this.linksRepository.find({
      where: { user: {
        id: id
      } },
    });
  }
}
