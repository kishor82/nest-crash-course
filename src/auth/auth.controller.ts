import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { omit } from 'lodash';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LocalAuthGuard } from './local.auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  //signup
  @Post('singup')
  async addUser(@Body() userData: CreateUserDto) {
    const { password, username, name } = userData;
    const saltOrRounds = 10;

    const isUserExist = await this.usersService.findOne({ username });

    if (isUserExist) {
      throw new BadRequestException('username must be unique');
    }

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
  login(@Request() req, @Body() body: LoginUserDto): any {
    return this.authService.login(body); // TODO: return JWT access token
  }

  //Authenticated user
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiOperation({ summary: 'Get Authenticated user' })
  getProtected(@Request() req): string {
    return req.user; // TODO: require an Bearer token, validate token
  }
}
