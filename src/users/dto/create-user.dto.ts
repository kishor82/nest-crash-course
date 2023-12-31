// DTO : Data transfer Object

import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, MaxLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsAlphanumeric()
  @MaxLength(10)
  name: string;

  @ApiProperty()
  @IsAlphanumeric()
  @MaxLength(12)
  username: string;

  @ApiProperty()
  password: string;
}

export class UpdateUserDto {
  @ApiProperty()
  @IsAlphanumeric()
  @MaxLength(10)
  name: string;
}
