"use client"

import { useEffect, useState } from "react";
import { getArticlesApi } from "@/api/article";
import ArticleLoading from "./loading";
import { Article } from "@/model/article";
import NavBar from "@/components/navbar";
import ArticleCard from "@/components/article.card";
import ArticleGridItem from "@/components/article.grid.item";
import { toast } from "react-toastify";

export default function Articles() {

    const [page, setPage] = useState(1);
    const [articles, setArticles] = useState<Article[]>([]);
    const [hasMoreArticles, setHasMoreArticles] = useState(false);
    const [isFetchArticlesLoading, setIsFetchArticlesLoading] = useState(true);

    useEffect(() => {
        getArticlesList();
    }, [page]);

    useEffect(() => {
        setPage(1)
    }, []);

    const getArticlesList = () => {
        setIsFetchArticlesLoading(true);
        getArticlesApi({ page, limit: 12 }).then((data) => {
            setArticles(prev =>
                page === 1 ? data.articles : [...prev, ...data.articles]
            );
            setHasMoreArticles(data.currentPage !== data.lastPage);
            setIsFetchArticlesLoading(false);
        }).catch((error) => {
            toast.error('Error while fetching Article detail')
        });
    };

    const handleLoadMore = () => {
        setPage(prev => prev + 1);
    };

    return (
        <section>
            <header className="py-4 font-family-inter text-gray-60 font-sm flex items-center justify-center space-x-4 ">
                <span>Subscribe to our Newsletter For New & latest Blogs and Resources
                </span> <svg width="14" height="14" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M8.75 4.25L20 4.25C20.1989 4.25 20.3897 4.32902 20.5303 4.46967C20.671 4.61032 20.75 4.80109 20.75 5V16.25C20.75 16.6642 20.4142 17 20 17C19.5858 17 19.25 16.6642 19.25 16.25V6.81066L5.53033 20.5303C5.23744 20.8232 4.76256 20.8232 4.46967 20.5303C4.17678 20.2374 4.17678 19.7626 4.46967 19.4697L18.1893 5.75L8.75 5.75C8.33579 5.75 8 5.41421 8 5C8 4.58579 8.33579 4.25 8.75 4.25Z" fill="#FFD11A" />
                </svg>
            </header>

            <NavBar />
            <div className="px-6 lg:px-0 md:px-0 xl:px-0">
                {isFetchArticlesLoading && page === 1 ? (
                    <ArticleLoading />
                ) : (
                    <>
                        <div className="space-y-6 my-12 bg-dark-10">
                            <hr className="border-dark-15" />
                            <h1 className="max-w-7xl mx-auto text-4xl md:text-5xl lg:text-4xl font-kumbh text-white">
                                Today's Articles: Stay Informed
                            </h1>
                            <hr className="border-dark-15" />
                        </div>

                        <div className="max-w-7xl mx-auto space-y-16 md:space-y-8">
                            {articles.slice(0, 3).map((article) => (
                                <ArticleCard key={article.id} article={article} />
                            ))}
                        </div>

                        <div className="space-y-12 my-12 bg-dark-10">
                            <hr className="border-dark-15" />
                            <h1 className="max-w-7xl mx-auto text-4xl md:text-5xl lg:text-4xl font-kumbh text-white">
                                All Articles: Explore
                            </h1>
                            <hr className="border-dark-15" />
                        </div>

                        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {articles.slice(3).map((article) => (
                                <ArticleGridItem key={article.id} article={article} isFromMyArticles={false} />
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
                )}
            </div>

        </section>
    );
}