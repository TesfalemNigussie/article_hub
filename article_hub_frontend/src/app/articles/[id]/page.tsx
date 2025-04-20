"use client"

import { format } from "date-fns";
import { useEffect, useState } from "react";
import ArticleDetailLoading from "./loading";
import { useParams } from "next/navigation";
import { addCommentApi, getArticleByIdApi, getCommentsApi } from "@/api/article";
import { Comment } from "@/model/comment";
import { Article } from "@/model/article";
import { toast } from "react-toastify";
import { useUser } from "@/hooks/user.hook";

export default function ArticleDetail() {

    const params = useParams()
    const { userId } = useUser()

    const id = params.id as string ?? ''

    const [content, setContent] = useState('');
    const [article, setArticle] = useState<Article>();
    const [comments, setComments] = useState<Comment[]>([]);
    const [isArticleDetailLoading, setIsArticleDetailLoading] = useState(true);

    const getComments = () => {
        getCommentsApi({ articleId: id, page: 1, limit: 10 }).then((data) => {
            setComments(data)
        })
    }

    const addComment = () => {
        addCommentApi({ articleId: id, content: content, userId: userId ?? null }).then((data) => {
            getComments();
        })
    }

    useEffect(() => {
        setIsArticleDetailLoading(true);
        getArticleByIdApi(id).then((data) => { setIsArticleDetailLoading(false), setArticle(data) })
            .catch((error) => {
                toast.error('Error while fetching Article')
            });

        getComments();
    }, [])

    return (
        <>
            {isArticleDetailLoading && <ArticleDetailLoading />}

            {!isArticleDetailLoading &&
                <div className="w-full flex flex-col items-center bg-neutral-900">
                    <div className="w-full h-[480px] relative overflow-hidden">
                        <img
                            src={article?.imageUrl}
                            alt={article?.title}
                            className="absolute inset-0 w-full h-full object-cover z-0"
                        />
                    </div>

                    <div className="text-center py-6 px-4">
                        <h1 className="text-4xl md:text-5xl font-kumbh font-bold text-white">
                            {article?.title}
                        </h1>
                        <p className="mt-2 text-sm font-medium text-yellow-55">
                            {article?.category}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-y border-neutral-800 w-full">
                        <div className="md:col-span-2 px-6 md:px-40 py-10 flex flex-col gap-4">
                            <p className="text-neutral-400 text-lg font-normal leading-relaxed">
                                {article?.content}
                            </p>

                            <div className="mt-10 border-t border-neutral-800 pt-6">
                                <h2 className="text-white text-2xl font-semibold mb-4">Comments</h2>

                                <div className="flex flex-col gap-4 mb-6">
                                    <textarea
                                        placeholder="Write your comment..."
                                        onChange={(e) => setContent(e.target.value)}
                                        className="w-full bg-neutral-800 text-white border border-neutral-700 rounded-lg p-4 resize-none focus:outline-none"
                                        rows={4}
                                    />
                                    <button
                                        onClick={addComment}
                                        className="self-end bg-yellow-55 text-black font-bold py-2 px-6 rounded-lg transition duration-200"
                                    >
                                        Submit
                                    </button>
                                </div>

                                <div className="flex flex-col gap-6">
                                    {comments?.map((i) => (
                                        <div key={i.id} className="flex items-start gap-4">
                                            <div className="rounded-full w-10 h-10 flex items-center justify-center bg-amber-600 text-sm font-semibold text-white">
                                                {i.user?.firstName ? i.user?.firstName[0] : 'U'}{i.user?.lastName ? i.user?.lastName[0] : 'U'}
                                            </div>
                                            <div>
                                                <p className="text-white font-medium">{i?.user?.firstName ?? "Unknow"} {i?.user?.lastName ?? "User"}</p>
                                                <p className="text-neutral-400 mt-1">{i.content}</p>
                                                <span className="text-gray-600 text-sm mt-1 block">{format(i?.createdAt, 'MMMM dd, yyyy hh:mm')}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="border-t md:border-l md:border-t-0 border-neutral-800 py-10 flex flex-col gap-12">
                            <div className="flex items-center px-6 md:px-10 space-x-4 border-b border-neutral-800 pb-6">
                                <div className="flex items-center space-x-2">
                                    <div className="rounded-full w-10 h-10 flex items-center justify-center bg-amber-600 text-sm font-semibold text-white">
                                        {article?.author?.firstName[0]}
                                        {article?.author?.lastName[0]}
                                    </div>
                                    <span className="text-white font-kumbh">
                                        {article?.author?.firstName} {article?.author?.lastName}
                                    </span>
                                </div>

                                <span className="text-gray-600">•</span>
                                {
                                    article?.createdAt && <span className="text-gray-600">
                                        {format(article?.createdAt, 'MMMM dd, yyyy hh:mm')}
                                    </span>
                                }

                                <span className="text-gray-600">•</span>

                                <div className="flex items-center text-gray-600">
                                    <svg width="16" height="16" viewBox="0 0 24 25" fill="none">
                                        <path
                                            d="M12 6.60406C12.6507 5.84844 13.7765 5 15.4907 5C18.4883 5 20.5 7.79375 20.5 10.3953C20.5 15.8338 13.6792 20 12 20C10.3208 20 3.5 15.8338 3.5 10.3953C3.5 7.79375 5.51167 5 8.50933 5C10.2235 5 11.3493 5.84844 12 6.60406Z"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        />
                                    </svg>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-3.5 px-6 md:px-10 ">
                                <div
                                    className="px-6 py-2.5 bg-neutral-900 rounded-full outline-1 outline-neutral-800 flex items-center gap-2 hover:bg-neutral-800 transition-colors"
                                >
                                    <span className="text-orange-600 text-xl"><svg width="24" height="24" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16.497 29.6234L16.4878 29.6185L16.4557 29.6011C16.4284 29.5862 16.3893 29.5648 16.3392 29.5369C16.2391 29.481 16.0951 29.3993 15.9134 29.2923C15.55 29.0786 15.0353 28.7639 14.4196 28.3546C13.1902 27.5373 11.5476 26.336 9.90051 24.8006C6.64107 21.7622 3.1875 17.2481 3.1875 11.6875C3.1875 7.53942 6.6776 4.25 10.8906 4.25C13.3682 4.25 15.5866 5.38204 17 7.15643C18.4134 5.38204 20.6318 4.25 23.1094 4.25C27.3224 4.25 30.8125 7.53942 30.8125 11.6875C30.8125 17.2481 27.3589 21.7622 24.0995 24.8006C22.4524 26.336 20.8098 27.5373 19.5804 28.3546C18.9647 28.7639 18.45 29.0786 18.0866 29.2923C17.9049 29.3993 17.7609 29.481 17.6608 29.5369C17.6107 29.5648 17.5716 29.5862 17.5443 29.6011L17.5122 29.6185L17.503 29.6234L17.4991 29.6255C17.1874 29.791 16.8126 29.791 16.5009 29.6255L16.497 29.6234Z" stroke="white   " />
                                    </svg>
                                    </span>
                                    <span className="text-neutral-400 text-lg font-normal font-kumbh leading-relaxed">
                                        0
                                    </span>
                                </div>

                                <div
                                    className="px-6 py-2.5 bg-neutral-900 rounded-full outline-1 outline-neutral-800 flex items-center gap-2 hover:bg-neutral-800 transition-colors"
                                >
                                    <span className="text-xl">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 20.25C16.9706 20.25 21 16.5563 21 12C21 7.44365 16.9706 3.75 12 3.75C7.02944 3.75 3 7.44365 3 12C3 14.1036 3.85891 16.0234 5.2728 17.4806C5.70538 17.9265 6.01357 18.5192 5.85933 19.121C5.68829 19.7883 5.368 20.3959 4.93579 20.906C5.0918 20.9339 5.25 20.9558 5.40967 20.9713C5.60376 20.9903 5.80078 21 6 21C7.28201 21 8.47016 20.5979 9.44517 19.9129C10.2551 20.1323 11.1125 20.25 12 20.25Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                    <span className="text-neutral-400 text-lg font-normal font-kumbh leading-relaxed">
                                        {article?.commentCount}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}