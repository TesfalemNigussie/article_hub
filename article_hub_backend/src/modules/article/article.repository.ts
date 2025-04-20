import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ArticleRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: any) {
    return this.prisma.article.create({ data });
  }

  async findOne(param: { id: string, include?: { author: boolean, commentCount: boolean } }) {
    const result = await this.prisma.article.findUnique(
      {
        where: { id: param.id },
        include: {
          author: param.include?.author ?? false,
          _count: param.include?.commentCount ? { select: { comments: true } } : false,
        }
      });

    const { _count, ...rest } = result;
    return {
      ...rest,
      commentCount: _count?.comments ?? 0,
    };
  }

  async findAll(param: { page: number, limit: number, include?: { author: boolean, comments: boolean, commentCount: boolean } }) {

    const { page, limit, include } = param;

    const currentPage = Number(page) > 0 ? Number(page) : 1;
    const currentLimit = Number(limit) > 0 ? Number(limit) : 10;

    const skip = (currentPage - 1) * currentLimit;

    const [articles, totalArticleCount] = await Promise.all([
      this.prisma.article.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
          comments: include?.comments ?? false,
          author: include?.author ?? false,
          _count: include?.commentCount ? { select: { comments: true } } : false,
        },
        skip,
        take: currentLimit,
      }),
      this.prisma.article.count(),
    ]);

    const cleanedArticles = articles.map(article => {
      const { _count, ...rest } = article;
      return {
        ...rest,
        commentCount: _count?.comments ?? 0,
      };
    });

    return {
      articles: cleanedArticles,
      totalArticleCount,
      currentPage,
      lastPage: Math.ceil(totalArticleCount / currentLimit),
    };
  }

  async findBy(param: { page: number, limit: number, category?: Category, authorId?: string, title?: string, include?: { author: boolean, comments: boolean, commentCount: boolean } }) {

    const { page, limit, category, authorId, title, include } = param;

    const selectedFilters = {
      ...(category && { category }),
      ...(authorId && { authorId }),
      ...(title && { title: { contains: title } }),
    }

    const currentPage = Number(page) > 0 ? Number(page) : 1;
    const currentLimit = Number(limit) > 0 ? Number(limit) : 10;

    const skip = (currentPage - 1) * currentLimit;

    const [articles, totalArticleCount] = await Promise.all([
      this.prisma.article.findMany({
        where: selectedFilters,
        orderBy: { createdAt: 'desc' },
        include: {
          comments: include?.comments ?? false,
          author: include?.author ?? false,
          _count: include?.commentCount ? { select: { comments: true } } : false,
        },
        skip,
        take: currentLimit,
      }),
      this.prisma.article.count({
        where: selectedFilters,
      }),
    ]);

    const cleanedArticles = articles.map(article => {
      const { _count, ...rest } = article;
      return {
        ...rest,
        commentCount: _count?.comments ?? 0,
      };
    });

    return {
      articles: cleanedArticles,
      totalArticleCount,
      currentPage,
      lastPage: Math.ceil(totalArticleCount / currentLimit),
    };
  }

  async update(id: string, data: any) {
    return this.prisma.article.update({
      where: { id },
      data: { ...data },
    });
  }

  async delete(id: string) {
    await Promise.all([
      this.prisma.comment.deleteMany({
        where: { articleId: id },
      }),
      this.prisma.favorite.deleteMany({
        where: { articleId: id },
      })
    ]);

    return this.prisma.article.delete({ where: { id } });
  }
}
