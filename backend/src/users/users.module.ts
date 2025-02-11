import { Module } from '@nestjs/common';
import { UsersController } from './infra/controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/user.entity';

import { CreateUserUseCase } from './app/use-cases/create-user';
import { LoginUseCase } from './app/use-cases/login';
import { CheckTokenUseCase } from './app/use-cases/check-token';
import { FindByEmailOrUsernameUseCase } from './app/use-cases/find-by-email-or-username';
import { UpdateUserUseCase } from './app/use-cases/update';
import { FindByIdUseCase } from './app/use-cases/find-by-id';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    LoginUseCase,
    CheckTokenUseCase,
    FindByEmailOrUsernameUseCase,
    UpdateUserUseCase,
    FindByIdUseCase,
  ],
  exports: [FindByEmailOrUsernameUseCase],
})
export class UsersModule {}
