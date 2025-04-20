export default function ArticleLoading() {
    return (
        <>
            {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="max-w-7xl mx-auto my-10 flex flex-col lg:flex-row gap-8 lg:gap-12 bg-dark-10 rounded-lg overflow-hidden animate-pulse">
                    <div className="w-full lg:w-96 h-52 max-h-72 lg:h-auto flex-shrink-0 bg-dark-15" />
                    <div className="flex-1 space-y-8 md:space-y-4 py-5 px-4">
                        <div className="h-8 bg-dark-15 rounded w-3/4" />
                        <div className="h-4 bg-dark-15 rounded w-full" />
                        <div className="h-4 bg-dark-15 rounded w-5/6" />
                        <div className="h-4 bg-dark-15 rounded w-2/3" />

                        <div className="flex space-x-12">
                            <div className="space-y-2">
                                <div className="h-3 w-16 bg-dark-15 rounded" />
                                <div className="h-4 w-24 bg-dark-15 rounded" />
                            </div>
                            <div className="space-y-2">
                                <div className="h-3 w-24 bg-dark-15 rounded" />
                                <div className="h-4 w-28 bg-dark-15 rounded" />
                            </div>
                            <div className="space-y-2">
                                <div className="h-3 w-20 bg-dark-15 rounded" />
                                <div className="h-4 w-16 bg-dark-15 rounded" />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="h-10 w-20 bg-dark-15 rounded-full" />
                            <div className="h-10 w-20 bg-dark-15 rounded-full" />
                        </div>
                    </div>
                </div>

            ))}
            <div className="max-w-7xl mx-auto  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="bg-dark-10 rounded-lg overflow-hidden">
                        {/* Image shimmer */}
                        <div className="w-full h-48 bg-dark-15  animate-pulse"></div>

                        {/* Content shimmer */}
                        <div className="p-6 space-y-4">
                            {/* Title shimmer */}
                            <div className="h-6 bg-dark-15  rounded animate-pulse w-3/4"></div>
                            <div className="h-6 bg-dark-15  rounded animate-pulse w-1/2"></div>

                            {/* Content text shimmer */}
                            <div className="space-y-2">
                                <div className="h-4 bg-dark-15  rounded animate-pulse"></div>
                                <div className="h-4 bg-dark-15  rounded animate-pulse w-5/6"></div>
                                <div className="h-4 bg-dark-15  rounded animate-pulse w-2/3"></div>
                            </div>

                            {/* Meta info shimmer */}
                            <div className="flex items-center justify-between pt-4">
                                <div className="h-4 bg-dark-15  rounded animate-pulse w-16"></div>
                                <div className="h-4 bg-dark-15  rounded animate-pulse w-20"></div>
                            </div>

                            {/* Actions shimmer */}
                            <div className="flex justify-between items-center pt-6">
                                <div className="flex gap-3">
                                    <div className="h-4 bg-dark-15  rounded animate-pulse w-8"></div>
                                    <div className="h-4 bg-dark-15  rounded animate-pulse w-8"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>)
}