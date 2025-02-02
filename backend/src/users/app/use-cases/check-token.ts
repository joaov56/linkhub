import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CheckTokenUseCase {
  constructor(private jwtService: JwtService) {}
  async execute(token: string) {
    try {
      const splited = token.split('Bearer ')[1];

      const decoded = await this.jwtService.verifyAsync(splited);

      return decoded.user;
    } catch (error) {
      return {
        error,
      };
    }
  }
}
