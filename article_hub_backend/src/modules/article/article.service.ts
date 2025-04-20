import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleRepository } from './article.repository';
import { Article } from './interface/article';
import { Category } from '@prisma/client';

@Injectable()
export class ArticleService {
  constructor(private readonly articleRepository: ArticleRepository) { }

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    return await this.articleRepository.create(createArticleDto);
  }

  async findOne(id: string) {
    const article = await this.articleRepository.findOne({ id: id, include: { author: true, commentCount: true } });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    return article;
  }

  async findAll(page: number, limit: number) {
    return await this.articleRepository.findAll({ page, limit, include: { author: true, comments: false, commentCount: true } });
  }

  async findByCategory(category: Category) {
    return await this.articleRepository.findBy({ page: 1, limit: 10, category: category, include: { author: true, comments: false, commentCount: true } });
  }

  async findByAuthor(authorId: string, page: number, limit: number) {
    return await this.articleRepository.findBy({ page: page, limit: limit, authorId: authorId, include: { author: true, comments: false, commentCount: true } });
  }

  async update(id: string, updateArticleDto: UpdateArticleDto) {

    const article = await this.articleRepository.findOne({ id: id });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    return this.articleRepository.update(id, updateArticleDto);
  }

  async delete(id: string) {

    const article = await this.articleRepository.findOne({ id: id });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    return this.articleRepository.delete(id);
  }
}
