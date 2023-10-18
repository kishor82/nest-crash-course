import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { LoginUserDto } from './users/dto/login-user.dto';
import { AuthenticatedGuard } from './auth/authenticated.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req, @Body() body: LoginUserDto): any {
    return {
      user: req.user,
      ...body,
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('protected')
  getProtected(): string {
    return this.appService.getHello('This is Protected content');
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
