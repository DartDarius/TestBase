import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class CreateArticleDto {
  @ApiProperty({ description: 'Заголовок статьи' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Содержание статьи' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ description: 'Теги статьи', isArray: true })
  @IsArray()
  @IsOptional()
  tags: string[];

  @ApiProperty({ description: 'Публичная ли статья' })
  @IsBoolean()
  @IsOptional()
  isPublic: boolean;

  @IsNotEmpty()
  @IsOptional()
  user: User;
}
