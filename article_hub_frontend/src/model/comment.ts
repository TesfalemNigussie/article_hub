import { User } from "./user";

export interface Comment {
    id: string;

    content: string;

    userId: string;

    articleId: string;

    createdAt: Date;

    user?: User;
}