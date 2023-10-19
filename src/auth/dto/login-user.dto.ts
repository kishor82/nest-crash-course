// DTO : Data transfer Object

import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, MaxLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty()
  @IsAlphanumeric()
  @MaxLength(12)
  username: string;

  @ApiProperty()
  password: string;
}
