import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { omit } from 'lodash';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthenticatedGuard } from './authenticated.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private usersService: UsersService) {}

  //signup
  @Post('singup')
  async addUser(@Body() userData: CreateUserDto) {
    const { password, username, name } = userData;
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const result = await this.usersService.createUser({
      username,
      password: hashedPassword,
      name,
    });

    return {
      msg: 'User successfully registered',
      user: omit(result, ['password']),
    };
  }

  //Login
  @UseGuards(LocalAuthGuard)
  @Post('login')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login(@Request() req, @Body() _body: LoginUserDto): any {
    return req.user;
  }

  //Authenticated user
  @UseGuards(AuthenticatedGuard)
  @Get('me')
  getProtected(@Request() req): string {
    return req.user;
  }
}
