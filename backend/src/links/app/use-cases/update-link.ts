import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Link } from 'src/links/domain/link.entity';
import { UpdateLinkDto } from 'src/links/dto/update-link.dto';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UpdateLinkUseCase {
    constructor(
        @InjectRepository(Link)
        private linksRepository: Repository<Link>,
    ) {}

    async execute(updateLinkDto: UpdateLinkDto): Promise<UpdateResult>{
        const link = await this.linksRepository.update(updateLinkDto.id, updateLinkDto);
        return link;
    }
}
