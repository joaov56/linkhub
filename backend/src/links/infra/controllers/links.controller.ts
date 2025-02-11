import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';

import { AuthGuard } from 'src/auth/auth.guard';
import { CreateLinkUseCase } from 'src/links/app/use-cases/create-link';
import { CreateLinkDto } from 'src/links/dto/create-link.dto';

@Controller('links')
export class LinksController {
  constructor(private readonly createLinkUseCase: CreateLinkUseCase) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() body: CreateLinkDto, @Request() req) {
    const { user } = req.user;

    return this.createLinkUseCase.execute(body, user);
  }
}
