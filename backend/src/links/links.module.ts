import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Link } from './domain/link.entity';
import { LinksController } from './infra/controllers/links.controller';
import { CreateLinkUseCase } from './app/use-cases/create-link';

@Module({
  imports: [TypeOrmModule.forFeature([Link])],
  controllers: [LinksController],
  providers: [CreateLinkUseCase],
})
export class LinksModule {}
