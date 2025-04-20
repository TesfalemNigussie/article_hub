import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CommentRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: any) {
    return this.prisma.comment.create({ data });
  }

  async findOne(id: string) {
    return await this.prisma.comment.findUnique({ where: { id } });
  }

  async findAll(param: { page: number, limit: number, include?: { user: boolean } }) {

    const { page, limit, include } = param;

    const currentPage = Number(page) > 0 ? Number(page) : 1;
    const currentLimit = Number(limit) > 0 ? Number(limit) : 10;

    const skip = (currentPage - 1) * currentLimit;

    const [comments, totalCommentsCount] = await Promise.all([
      this.prisma.comment.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
          user: include?.user ?? false,
        },
        skip,
        take: currentLimit,
      }),
      this.prisma.comment.count(),
    ]);

    return {
      comments,
      totalCommentsCount,
      currentPage,
      lastPage: Math.ceil(totalCommentsCount / currentLimit),
    };
  }

  async findBy(param: { page: number, limit: number, articleId?: string, userId?: string, include?: { user: boolean } }) {

    const { page, limit, articleId, userId, include } = param;

    const selectedFilters = {
      ...(articleId && { articleId }),
      ...(userId && { userId }),
    }

    const currentPage = Number(page) > 0 ? Number(page) : 1;
    const currentLimit = Number(limit) > 0 ? Number(limit) : 10;

    const skip = (currentPage - 1) * currentLimit;

    return this.prisma.comment.findMany({
      where: selectedFilters,
      include: {
        user: include?.user ?? false,
      },
      orderBy: { createdAt: 'desc' },
      skip: skip,
      take: currentLimit,
    });
  }
}
