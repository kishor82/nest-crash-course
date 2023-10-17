import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super(); // config
  }

  async validate(username: string, passport: string): Promise<any> {
    const user = await this.authService.validateUser(username, passport);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
