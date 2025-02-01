import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Headers,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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

    return this.usersService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() { email, password }) {
    return await this.usersService.login(email, password);
  }

  @Post('verifyUser')
  async verifyUser(@Body() { email }) {
    const user = await this.usersService.findByEmail(email);
    return { exists: !!user };
  }

  @Get('checkToken')
  async checkToken(@Headers() headers: { authorization: string }) {
    const user = await this.usersService.checkToken(headers.authorization);

    if (!user.id) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
