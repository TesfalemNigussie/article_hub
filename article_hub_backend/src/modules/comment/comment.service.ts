import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentRepository } from './comment.repository';
import { Comment } from 'src/modules/comment/interface/comment';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) { }

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    return await this.commentRepository.create(createCommentDto);
  }

  findByArticle(articleId: string, page: number, limit: number) {
    return this.commentRepository.findBy({ articleId: articleId, page: page, limit: limit, include: { user: true } });
  }
}
