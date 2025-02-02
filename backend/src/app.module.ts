import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/domain/user.entity';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
