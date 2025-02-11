import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';

import { AuthGuard } from 'src/auth/auth.guard';
import { CreateLinkUseCase } from 'src/links/app/use-cases/create-link';
import { FindLinksByUsernameUseCase } from 'src/links/app/use-cases/find-links-by-username';
import { CreateLinkDto } from 'src/links/dto/create-link.dto';


@Controller('links')
export class LinksController {
  constructor(
    private readonly createLinkUseCase: CreateLinkUseCase,
    private readonly findLinksByUsername: FindLinksByUsernameUseCase,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() body: CreateLinkDto, @Request() req) {
    const { user } = req.user;

    return this.createLinkUseCase.execute(body, user);
  }

  @Get(':username')
  findByUsername(@Request() req) {
    const { username } = req.params;

    return this.findLinksByUsername.execute(username);
  }
}
