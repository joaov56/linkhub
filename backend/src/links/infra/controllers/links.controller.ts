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
import { FindLinksByUserIdUseCase } from 'src/links/app/use-cases/find-links-by-user-id';
import { FindLinksByUsernameUseCase } from 'src/links/app/use-cases/find-links-by-username';
import { CreateLinkDto } from 'src/links/dto/create-link.dto';


@Controller('links')
export class LinksController {
  constructor(
    private readonly createLinkUseCase: CreateLinkUseCase,
    private readonly findLinksByUsername: FindLinksByUsernameUseCase,
    private readonly findLinksByUserId: FindLinksByUserIdUseCase,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() body: CreateLinkDto, @Request() req) {
    const { user } = req.user;

    return this.createLinkUseCase.execute(body, user);
  }

  @Get('/findByUsername/:username')
  findByUsername(@Request() req) {
    const { username } = req.params;

    return this.findLinksByUsername.execute(username);
  }

  @Get('/findByUserId/:id')
  findByUserId(@Request() req) {
    const { id } = req.params;

    return this.findLinksByUserId.execute(id);
  }
}
