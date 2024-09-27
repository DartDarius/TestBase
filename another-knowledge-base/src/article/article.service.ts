import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { ERROR_MESSAGE } from 'src/helpers/constants';
import { UpdateArticleDto } from './dto/update-article.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createArticleDto: CreateArticleDto, id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error(ERROR_MESSAGE.USER_ID);
    }

    const newArticle = this.articleRepository.create({
      title: createArticleDto.title,
      content: createArticleDto.content,
      tags: createArticleDto.tags,
      isPublic: createArticleDto.isPublic,
      user: user,
    });

    return await this.articleRepository.save(newArticle);
  }

  findAll() {
    return this.articleRepository.find();
  }

  findPublicArticles() {
    return this.articleRepository.find({ where: { isPublic: true } });
  }

  findById(id: string) {
    return this.articleRepository.findOne({ where: { id } });
  }

  async updateArticle(id: string, updateArticleDto: UpdateArticleDto) {
    const article = await this.articleRepository.findOne({ where: { id } });

    if (!article) {
      throw new NotFoundException(ERROR_MESSAGE.ARTICLE_NOT_FOUND);
    }

    return await this.articleRepository.update(id, updateArticleDto);
  }

  async delete(id: string) {
    const article = await this.articleRepository.findOne({
      where: { id },
    });
    if (!article) {
      throw new NotFoundException(ERROR_MESSAGE.ARTICLE_NOT_FOUND);
    }

    return await this.articleRepository.delete(id);
  }

  async findByTags(tags: string[]) {
    return this.articleRepository
      .createQueryBuilder('article')
      .where('article.tags @> :tags', { tags: JSON.stringify(tags) })
      .getMany();
  }
}
