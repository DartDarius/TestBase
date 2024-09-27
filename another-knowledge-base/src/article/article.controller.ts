import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
  Put,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { JwtAuthGuard } from 'src/authorization/guards/jwt-auth.guard';
import { CreateArticleDto } from './dto/create-article.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateArticleDto } from './dto/update-article.dto';

@ApiTags('article')
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @ApiOperation({
    summary: 'Create article',
    description: 'You can create article',
  })
  @ApiBearerAuth()
  @Post('createArticle')
  @UseGuards(JwtAuthGuard)
  create(@Body() createArticleDto: CreateArticleDto, @Req() req) {
    const userId = req.user.userId;
    return this.articleService.create(createArticleDto, userId);
  }

  @ApiOperation({
    summary: 'Get all articles',
    description: 'You can get all article in list',
  })
  @ApiBearerAuth()
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.articleService.findAll();
  }

  @Get('public')
  findPublicArticles() {
    return this.articleService.findPublicArticles();
  }

  @ApiOperation({
    summary: 'Get articles by tags',
    description: 'You can get articles filtered by tags',
  })
  @ApiBearerAuth()
  @Get('tags')
  @UseGuards(JwtAuthGuard)
  findByTags(@Query('tags') tags: string) {
    const tagArray = tags.split(',');
    return this.articleService.findByTags(tagArray);
  }

  @ApiOperation({
    summary: 'Get article',
    description: 'You can get one article by id',
  })
  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findById(@Param('id') id: string) {
    return this.articleService.findById(id);
  }

  @ApiOperation({
    summary: 'Update article',
    description: 'You can update one article by id',
  })
  @ApiBearerAuth()
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.updateArticle(id, updateArticleDto);
  }

  @ApiOperation({
    summary: 'Delete article',
    description: 'You can remove one article by id',
  })
  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: string) {
    return this.articleService.delete(id);
  }
}
