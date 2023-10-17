import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { omit } from 'lodash';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.usersService.findOne({ username });

    if (user && user.password === password) {
      return omit(user, ['password,username']);
    }

    return null;
  }
}
