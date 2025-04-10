import LoadingSpinner from '@/shared/ui/loadingSpinner/LoadingSpinner'
import { usePaginatedNews } from '../model/usePaginatedNews'
import { parseHtmlToReact } from '@/shared/lib/parse-html'

export const ListNews = ({
    categoryId,
    groupId,
}: {
    categoryId: number
    groupId: number
}) => {
    const {
        paginatedNews,
        currentPage,
        totalPages,
        loading,
        error,
        PAGE_SIZE,
        setCurrentPage,
        nextPage,
        prevPage,
    } = usePaginatedNews(categoryId, groupId)

    if (error) {
        return <div className="text-center text-red-500">{error}</div>
    }
    if (paginatedNews.length === 0) {
        return <div className="text-center">Нет новостей для отображения</div>
    }
    console.log(paginatedNews[0].content)
    return (
        <div className="w-full max-w-5xl mx-auto py-8 px-4">
            {loading ? (
                <LoadingSpinner size="w-16 h-16" />
            ) : (
                paginatedNews.map(({ id, title, content, image }) => (
                    <a
                        key={id}
                        href={`/news/?news_id=${id}`}
                        className="flex flex-col sm:flex-row gap-6 mb-10 border-b pb-6 transition-colors duration-300 hover:bg-[#F3F4F6] cursor-pointer"
                    >
                        <div className="w-32 h-32 sm:w-40 sm:h-40 rounded overflow-hidden">
                            <img
                                src={image}
                                alt={title}
                                className="w-full h-full object-cover "
                            />
                        </div>

                        <div className="flex-1">
                            <h2 className="text-lg sm:text-xl font-semibold mb-2">
                                <span className=" no-underline">{title}</span>
                            </h2>
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                {parseHtmlToReact(content)}
                            </p>
                        </div>
                    </a>
                ))
            )}

            {/* Пагинация */}
            <div className="flex justify-center flex-wrap gap-2 mt-6">
                <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                    Назад
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 rounded ${
                            currentPage === i + 1
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    onClick={nextPage}
                    disabled={
                        currentPage === totalPages ||
                        paginatedNews.length < PAGE_SIZE
                    }
                    className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                    Далее
                </button>
            </div>
        </div>
    )
}
