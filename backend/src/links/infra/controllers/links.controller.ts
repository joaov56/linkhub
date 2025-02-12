import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Put,
  Delete,
} from '@nestjs/common';

import { AuthGuard } from 'src/auth/auth.guard';
import { CreateLinkUseCase } from 'src/links/app/use-cases/create-link';
import { DeleteLinkUseCase } from 'src/links/app/use-cases/delete-link';
import { FindLinksByUserIdUseCase } from 'src/links/app/use-cases/find-links-by-user-id';
import { FindLinksByUsernameUseCase } from 'src/links/app/use-cases/find-links-by-username';
import { UpdateLinkUseCase } from 'src/links/app/use-cases/update-link';
import { CreateLinkDto } from 'src/links/dto/create-link.dto';
import { UpdateLinkDto } from 'src/links/dto/update-link.dto';


@Controller('links')
export class LinksController {
  constructor(
    private readonly createLinkUseCase: CreateLinkUseCase,
    private readonly findLinksByUsername: FindLinksByUsernameUseCase,
    private readonly findLinksByUserId: FindLinksByUserIdUseCase,
    private readonly updateLinkUseCase: UpdateLinkUseCase,
    private readonly deleteLinkUseCase: DeleteLinkUseCase,
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

  @Put('/')
  updateLink(@Body() body: UpdateLinkDto) {
    return this.updateLinkUseCase.execute(body);
  }

  @Delete('/:id')
  deleteLink(@Request() req) {
    const { id } = req.params;

    return this.deleteLinkUseCase.execute(id);
  }

}
