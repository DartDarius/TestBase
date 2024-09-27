import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Имя пользователя' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'Email пользователя' })
  @IsEmail({}, { message: 'Invalid email address' })
  @IsString()
  readonly email: string;

  @ApiProperty({ description: 'Пароль пользователя' })
  @MinLength(6, { message: 'Password must be at least six characters long' })
  @MaxLength(20, { message: 'Password must not exceed twenty characters' })
  @IsString()
  @IsNotEmpty({ message: 'Password cannot be empty' })
  readonly password: string;
}
