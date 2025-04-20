import { Article } from "src/modules/article/interface/article";
import { User } from "src/modules/auth/interface/user";

export interface Comment {
    id: String;

    content: String;

    userId: String;

    articleId: String;

    user?: User;

    article?: Article;

    createdAt: Date;
}
