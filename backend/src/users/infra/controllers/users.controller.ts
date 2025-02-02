import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpException,
  HttpStatus,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { LoginDto } from '../../dto/login.dto';
import { CreateUserUseCase } from 'src/users/app/use-cases/create-user';
import { LoginUseCase } from 'src/users/app/use-cases/login';
import { CheckTokenUseCase } from 'src/users/app/use-cases/check-token';
import { FindByEmailOrUsernameUseCase } from 'src/users/app/use-cases/find-by-email-or-username';
import { UpdateUserUseCase } from 'src/users/app/use-cases/update';
import { FindByIdUseCase } from 'src/users/app/use-cases/find-by-id';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly checkTokenUseCase: CheckTokenUseCase,
    private readonly findByEmailOrUsernameUseCase: FindByEmailOrUsernameUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly findByIdUseCase: FindByIdUseCase,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    if (
      !createUserDto.username ||
      !createUserDto.email ||
      !createUserDto.password
    ) {
      throw new HttpException(
        'Missing necessary fields',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.createUserUseCase.execute(createUserDto);
  }

  @Post('login')
  async login(@Body() { email, password }: LoginDto) {
    return await this.loginUseCase.execute(email, password);
  }

  @Post('verifyUser')
  async verifyUser(@Body() { email, username }) {
    const user = await this.findByEmailOrUsernameUseCase.execute(
      email,
      username,
    );
    return { exists: !!user };
  }

  @UseGuards(AuthGuard)
  @Get('checkToken')
  async checkToken(@Headers() headers: { authorization: string }) {
    const user = await this.checkTokenUseCase.execute(headers.authorization);

    if (!user.id) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findByIdUseCase.execute(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.updateUserUseCase.execute(id, updateUserDto);
  }
}
