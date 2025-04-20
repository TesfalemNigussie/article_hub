import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { FindCommentsByArticleDto } from './dto/find-comments-by-article.dto';
import { FindCommentsDto } from './dto/find-comments.dto';

@Controller({
  path: 'comment',
  version: '1',
})
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @Get(':articleId')
  findByArticle(@Param() param: FindCommentsByArticleDto, @Query() queryParam: FindCommentsDto) {
    const { page, limit } = queryParam
    return this.commentService.findByArticle(param.articleId, page, limit);
  }
}
