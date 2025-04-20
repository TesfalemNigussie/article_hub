"use client"
import { format } from "date-fns";
import { useRouter } from 'next/navigation';
import { Article } from "../model/article";

export default function ArticleCard({ article }: { article: Article }) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/articles/${article.id}`);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 bg-dark-10 rounded-lg overflow-hidden transition-transform hover:scale-[1.01] cursor-pointer" onClick={handleClick}>
            <div className="w-full lg:w-96 h-52 max-h-62 lg:h-auto flex-shrink-0">
                <img
                    className="w-full h-full rounded-l-sm object-cover"
                    src={article.imageUrl}
                    alt={article.title}
                />
            </div>

            <div className="flex-1 space-y-8 md:space-y-4 py-5 px-4">
                <h3 className="text-2xl font-semibold font-family-kumbh text-white">
                    {article.title}
                </h3>

                <p className="text-sm text-dark-60 font-family-inter">
                    {article.content}
                </p>

                {/* Meta Info */}
                <div className="flex space-x-12">
                    <div className=' space-y-2'>
                        <span className="block text-dark-60 text-sm font-family-inter">Category</span>
                        <span className="block text-white text-sm  font-family-kumbh">{article.category}</span>
                    </div>

                    <div className=' space-y-2'>
                        <span className="block text-dark-60 text-sm font-family-inter">Publication Date</span>
                        <span className="block text-white text-sm  font-family-kumbh">{format(article.createdAt, "MMMM dd, yyyy hh:mm")}</span>
                    </div>

                    <div className=' space-y-2'>
                        <span className="block text-dark-60 text-sm font-family-inter">Author</span>
                        <div className=" flex space-x-2 items-center">
                            <div className=" rounded-full w-8 h-8 flex items-center self-center justify-center bg-amber-600 text-sm font-semibold p-2 text-white">
                                {article.author.firstName[0]}{article.author.lastName[0]}
                            </div>
                            <span className="block text-white text-sm  font-family-kumbh">{article.author.firstName} {article.author.lastName}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-4 ">
                    <button className="flex items-center gap-2 border border-dark-15 rounded-full bg-dark-10 px-4 py-2">
                        <svg width="20" height="20" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 6.60406C12.6507 5.84844 13.7765 5 15.4907 5C18.4883 5 20.5 7.79375 20.5 10.3953C20.5 15.8338 13.6792 20 12 20C10.3208 20 3.5 15.8338 3.5 10.3953C3.5 7.79375 5.51167 5 8.50933 5C10.2235 5 11.3493 5.84844 12 6.60406Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                className="text-dark-60"
                            />
                        </svg>
                        <span className="text-sm text-dark-60">{article.likesCount}</span>
                    </button>

                    <button className="flex items-center gap-2 border border-dark-15 rounded-full bg-dark-10 px-4 py-2">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 20.25C16.9706 20.25 21 16.5563 21 12C21 7.44365 16.9706 3.75 12 3.75C7.02944 3.75 3 7.44365 3 12C3 14.1036 3.85891 16.0234 5.2728 17.4806C5.70538 17.9265 6.01357 18.5192 5.85933 19.121C5.68829 19.7883 5.368 20.3959 4.93579 20.906C5.0918 20.9339 5.25 20.9558 5.40967 20.9713C5.60376 20.9903 5.80078 21 6 21C7.28201 21 8.47016 20.5979 9.44517 19.9129C10.2551 20.1323 11.1125 20.25 12 20.25Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                className="text-dark-60"
                            />
                        </svg>
                        <span className="text-sm text-dark-60">{article.commentCount}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}