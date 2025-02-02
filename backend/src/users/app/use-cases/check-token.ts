import { Injectable } from '@nestjs/common';
import { verify } from 'jsonwebtoken';

@Injectable()
export class CheckTokenUseCase {
  async execute(token: string) {
    try {
      const splited = token.split('Bearer ')[1];

      const decoded = await verify(splited, 'secret');

      return decoded.user;
    } catch (error) {
      return {
        error,
      };
    }
  }
}
