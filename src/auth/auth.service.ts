import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { omit } from 'lodash';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.usersService.findOne({ username });

    if (user && user.password === password) {
      return omit(user, ['password,username']);
    }

    return null;
  }

  async login(user: LoginUserDto) {
    const payload = { name: user.username };

    //TODO: fetch user info from db and check password

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
