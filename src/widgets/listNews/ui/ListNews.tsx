import LoadingSpinner from '@/shared/ui/loadingSpinner/LoadingSpinner'
import { usePaginatedNews } from '../model/usePaginatedNews'
import { parseHtmlToReact } from '@/shared/lib/parse-html'
import type { NewsTypes } from '@/shared/types/newsTypes'

interface ListNewsProps {
    categoryId: string | null
    groupId: string | null
    newsData: NewsTypes // Пропс для данных, полученных с сервера
}

export const ListNews: React.FC<ListNewsProps> = ({
    categoryId,
    groupId,
    newsData,
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
    } = usePaginatedNews(Number(categoryId), Number(groupId), newsData) // Преобразование типов в число

    if (error) {
        return <div className="text-center text-red-500">{error}</div>
    }

    const handleNewsClick = (newsId: number) => {
        // Получаем текущий URL
        const currentUrl = window.location.pathname
        // Разбиваем путь на сегменты
        const pathSegments = currentUrl.split('/').filter(Boolean)
        // Собираем всю часть пути за исключением первого сегмента
        const slugPath = pathSegments.slice(1).join('/')

        // Перенаправляем на страницу новости с параметром news_id
        window.location.href = `/news/${slugPath}?news_id=${newsId}`
    }

    return (
        <div className="w-full mx-auto py-4">
            {paginatedNews.length === 0 && loading ? (
                <div className="flex justify-center my-8">
                    <LoadingSpinner size="w-12 h-12" />
                </div>
            ) : (
                <div className="grid gap-6">
                    {paginatedNews.map(({ id, title, content, image }) => (
                        <article
                            key={id}
                            onClick={() => handleNewsClick(id)}
                            className="flex flex-col sm:flex-row gap-4 p-4 border-b border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                        >
                            <div className="sm:w-36 sm:h-36 rounded-lg overflow-hidden flex-shrink-0">
                                <img
                                    src={image}
                                    alt={title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-medium text-gray-900 mb-2 hover:text-[#1570EF]">
                                    {title}
                                </h3>
                                <div className="text-sm text-gray-700 line-clamp-3">
                                    {parseHtmlToReact(content)}
                                </div>
                                <div className="mt-2">
                                    <span className="text-[#1570EF] text-sm font-medium inline-flex items-center">
                                        Читать далее
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 ml-1"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}

            {/* Пагинация */}
            {totalPages > 1 && (
                <div className="flex justify-center flex-wrap gap-2 mt-8">
                    <button
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Назад
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-4 py-2 rounded text-sm font-medium ${
                                currentPage === i + 1
                                    ? 'bg-[#1570EF] text-white'
                                    : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
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
                        className="px-4 py-2 rounded text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Далее
                    </button>
                </div>
            )}
        </div>
    )
}
