import { BASE_URL } from "@/config/constant";

export const getArticlesApi = async (param: { page: number, limit: number }) => {
    const res = await fetch(`${BASE_URL}/api/v1/article/?page=${param.page}&limit=${param.limit}`);

    const result = await res.json();

    result.articles.map((e: any) => e.imageUrl = `${BASE_URL}/${e.imageUrl}`)

    return result;
}

export const getArticlesByAuthorApi = async (param: { authorId: string, page: number, limit: number }) => {
    const res = await fetch(`${BASE_URL}/api/v1/article/findByAuthor?authorId=${param.authorId}&page=${param.page}&limit=${param.limit}`);

    const result = await res.json();

    result.articles.map((e: any) => e.imageUrl = `${BASE_URL}/${e.imageUrl}`)

    return result;
}

export const getArticleByIdApi = async (articleId: string) => {
    const res = await fetch(`${BASE_URL}/api/v1/article/findOne/${articleId}`);

    const result = await res.json();

    result.imageUrl = `${BASE_URL}/${result.imageUrl}`;

    return result;
}

export const createArticleApi = async ({
    title,
    content,
    category,
    authorId,
    imageFile,
}: {
    title: string;
    content: string;
    category: string;
    authorId: string;
    imageFile: File;
}) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("authorId", authorId);
    formData.append("image", imageFile);

    const res = await fetch(`${BASE_URL}/api/v1/article/`, {
        method: "POST",
        body: formData,
    });

    return await res.json();
}

export const updateArticleApi = async ({
    id,
    title,
    content,
    category,
    imageFile,
}: {
    id: string;
    title: string;
    content: string;
    category: string;
    imageFile?: File | null;
}) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);

    if (imageFile) {
        formData.append("image", imageFile);
    }

    const res = await fetch(`${BASE_URL}/api/v1/article/${id}`, {
        method: "PATCH",
        body: formData,
    });

    return await res.json();
};

export const getCommentsApi = async (param: { articleId: string, page: number, limit: number }) => {
    const res = await fetch(`${BASE_URL}/api/v1/comment/${param.articleId}?page=${param.page}&limit=${param.limit}`);

    return await res.json();
}

export const addCommentApi = async (request: { articleId: string, userId: string | null, content: string }) => {
    const res = await fetch(`${BASE_URL}/api/v1/comment/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });

    return await res.json();
}

export const deleteArticleApi = async (articleId: string) => {
    const res = await fetch(`${BASE_URL}/api/v1/article/${articleId}`, {
        method: "DELETE",
    });

    return await res.json();
}
