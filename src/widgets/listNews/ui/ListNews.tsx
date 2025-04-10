import { usePaginatedNews } from '../model/usePaginatedNews'

export const ListNews = () => {
    const { paginatedNews, currentPage, totalPages, setCurrentPage } =
        usePaginatedNews()
    return (
        <div className="w-full max-w-5xl mx-auto py-8 px-4">
            {paginatedNews.map(({ id, title, description, image }) => (
                <div
                    key={id}
                    className="flex flex-col sm:flex-row gap-6 mb-10 border-b pb-6"
                >
                    <div className="w-32 h-32 sm:w-40 sm:h-40 rounded overflow-hidden">
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="flex-1">
                        <h2 className="text-lg sm:text-xl font-semibold mb-2">
                            {title}
                        </h2>
                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                            {description}
                        </p>
                    </div>
                </div>
            ))}

            {/* Пагинация */}
            <div className="flex justify-center flex-wrap gap-2 mt-6">
                <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
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
                    onClick={() =>
                        setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                    Далее
                </button>
            </div>
        </div>
    )
}
