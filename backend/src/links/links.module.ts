import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Link } from './domain/link.entity';
import { LinksController } from './infra/controllers/links.controller';
import { CreateLinkUseCase } from './app/use-cases/create-link';


import { FindLinksByUsernameUseCase } from './app/use-cases/find-links-by-username';
import { FindLinksByUserIdUseCase } from './app/use-cases/find-links-by-user-id';
import { UpdateLinkUseCase } from './app/use-cases/update-link';

@Module({
  imports: [TypeOrmModule.forFeature([Link])],
  controllers: [LinksController],
  providers: [
    CreateLinkUseCase,
    FindLinksByUserIdUseCase,
    FindLinksByUsernameUseCase,
    UpdateLinkUseCase
  ],
})
export class LinksModule {}
