import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

import { DatabaseModule } from './database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { LinksModule } from './links/links.module';

@Module({
  imports: [
    DatabaseModule,
    LinksModule,
    UsersModule,
    JwtModule.register({
      global: true,
      secret: 'test',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
