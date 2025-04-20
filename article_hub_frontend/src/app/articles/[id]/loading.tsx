export default function ArticleDetailLoading() {
    return (
        <div className="w-full flex flex-col items-center bg-dark-8 animate-pulse">
            <div className="w-full h-[480px] bg-neutral-800" />

            <div className="text-center py-6 px-4 w-full flex flex-col items-center">
                <div className="h-10 w-3/4 bg-neutral-800 rounded" />
                <div className="mt-2 h-4 w-32 bg-yellow-55 rounded" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-y border-neutral-800 w-full">
                <div className="md:col-span-2 px-6 md:px-40 py-10 flex flex-col gap-4">
                    <div className="space-y-3">
                        {[...Array(20)].map((_, i) => (
                            i % 3 == 0 ?
                                i % 6 == 0 ? <div key={i} className="h-4 w-full bg-neutral-800 rounded" /> :
                                    <div key={i} className="h-4 w-3/5 bg-neutral-800 rounded" /> :
                                <div key={i} className="h-4 w-4/5 bg-neutral-800 rounded" />
                        ))}
                    </div>

                    <div className="mt-10 border-t border-neutral-800 pt-6 animate-pulse">
                        <div className="h-4 bg-neutral-700 rounded w-1/4 mb-4" />

                        <div className="flex flex-col gap-4 mb-6">
                            <div className="w-full h-24 bg-neutral-800 rounded-lg" />
                            <div className="self-end w-32 h-10 bg-neutral-700 rounded-lg" />
                        </div>

                        <div className="flex flex-col gap-6">
                            {[1, 2].map((i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="rounded-full w-10 h-10 bg-neutral-700" />
                                    <div className="flex flex-col gap-2 w-full">
                                        <div className="h-4 bg-neutral-700 rounded w-1/4" />
                                        <div className="h-4 bg-neutral-700 rounded w-3/4" />
                                        <div className="h-3 bg-neutral-800 rounded w-1/6" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                <aside className="border-t md:border-l md:border-t-0 border-neutral-800 px-6 md:px-10 py-10 flex flex-col gap-12">
                    <div className="flex flex-wrap gap-3.5 border-b border-neutral-800 pb-6">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="px-6 py-2.5 bg-neutral-800 rounded-full w-24 h-10" />
                        ))}
                    </div>

                    <div className="flex items-center justify-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <div className="rounded-full w-10 h-10 bg-amber-700" />
                            <div className="w-24 h-4 bg-neutral-800 rounded" />
                        </div>

                        <span className="text-gray-600">•</span>

                        <div className="w-24 h-4 bg-neutral-800 rounded" />

                        <span className="text-gray-600">•</span>

                        <div className="w-6 h-6 bg-neutral-800 rounded-full" />
                    </div>
                </aside>
            </div>
        </div>
    );
}