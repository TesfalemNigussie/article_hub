import { Category } from "@prisma/client";
import { Comment } from "src/modules/comment/interface/comment";

export interface Article {
    id: String;

    title: String;

    content: String;

    category: Category;

    createdAt: Date;

    updatedAt: Date;

    author?: String;

    comments?: Comment[];
}
