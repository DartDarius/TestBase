import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ description: 'Имя пользователя', required: false })
  @IsString()
  @IsOptional()
  readonly name?: string;

  @ApiProperty({ description: 'Email пользователя', required: false })
  @IsEmail({}, { message: 'Invalid email address' })
  @IsString()
  @IsOptional()
  readonly email?: string;

  @ApiProperty({ description: 'Пароль пользователя', required: false })
  @MinLength(6, { message: 'Password must be at least six characters long' })
  @MaxLength(20, { message: 'Password must not exceed twenty characters' })
  @IsString()
  @IsOptional()
  readonly password?: string;
}
