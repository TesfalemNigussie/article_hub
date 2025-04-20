import { User } from "./user";

export const categories = ["TECHNOLOGY", "LIFESTYLE", "EDUCATION", "HEALTH", "TRAVEL"];

export interface Article {
    id: string;

    title: string;

    content: string;

    author: User;

    createdAt: Date;

    updatedAt: Date;

    imageUrl: string;

    category: string;

    likesCount: number;

    commentCount: number;
}