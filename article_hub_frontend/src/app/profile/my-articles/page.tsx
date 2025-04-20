"use client"

import { getArticlesByAuthorApi } from "@/api/article";
import ArticleGridItem from "@/components/article.grid.item";
import Navbar from "@/components/navbar";
import { Article } from "@/model/article";
import { useUser } from "@/hooks/user.hook";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function MyArticle() {

    const router = useRouter()

    const { userId } = useUser();

    const [page, setPage] = useState(1);
    const [articles, setArticles] = useState<Article[]>([]);
    const [hasMoreArticles, setHasMoreArticles] = useState(false);
    const [isFetchArticlesLoading, setIsFetchArticlesLoading] = useState(true);

    useEffect(() => {
        if (userId) {
            getMyArticles();
        }
    }, [userId, page]);

    useEffect(() => {
        setPage(1)
    }, []);

    const getMyArticles = async () => {
        setIsFetchArticlesLoading(true);

        try {
            const result = await getArticlesByAuthorApi({ authorId: userId ?? "", page, limit: 12 })
            setArticles(prev =>
                page === 1 ? result.articles : [...prev, ...result.articles]
            );
            setHasMoreArticles(result.currentPage !== result.lastPage);
        } catch (error) {
           toast.error('Error while fetching My Article')
        }

        setIsFetchArticlesLoading(false);
    };

    const handleLoadMore = () => {
        setPage(prev => prev + 1);
    };

    return (
        <>
            <Navbar />

            <div className="space-y-5 my-12 bg-dark-10">
                <hr className="border-gray-60 dark:border-dark-15" />
                <div className="max-w-7xl mx-auto flex justify-between">
                    <h1 className="text-4xl md:text-5xl lg:text-4xl font-kumbh text-white">
                        My Articles
                    </h1>
                    <button
                        type="button"
                        onClick={() => {
                            router.push('/profile/create-article')
                        }}
                        className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-yellow-55"
                    >
                        Create Article
                    </button>
                </div>

                <hr className="border-gray-60 dark:border-dark-15" />
            </div>

            <div className="max-w-7xl mx-auto  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                    <ArticleGridItem key={article.id} article={article} isFromMyArticles />
                ))}
            </div>

            {hasMoreArticles && (
                <div className="flex items-center justify-center my-20">
                    <button
                        type="button"
                        onClick={handleLoadMore}
                        className="bg-dark-8 border cursor-pointer border-dark-15 rounded-xl px-4 py-2 flex items-center text-gray-60 space-x-2"
                    >
                        {isFetchArticlesLoading && page > 1 ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                        ) : (
                            <>
                                <span>More Articles</span>
                                <svg
                                    width="25"
                                    height="25"
                                    viewBox="0 0 25 25"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M12.5 4.25C12.9142 4.25 13.25 4.58579 13.25 5L13.25 18.1893L18.7197 12.7197C19.0126 12.4268 19.4874 12.4268 19.7803 12.7197C20.0732 13.0126 20.0732 13.4874 19.7803 13.7803L13.0303 20.5303C12.7374 20.8232 12.2626 20.8232 11.9697 20.5303L5.21967 13.7803C4.92678 13.4874 4.92678 13.0126 5.21967 12.7197C5.51256 12.4268 5.98744 12.4268 6.28033 12.7197L11.75 18.1893L11.75 5C11.75 4.58579 12.0858 4.25 12.5 4.25Z"
                                        fill="#98989A"
                                    />
                                </svg>
                            </>
                        )}
                    </button>
                </div>
            )}
        </>
    )
}