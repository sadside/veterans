import React, { useState } from 'react'
import { Search, Filter, X } from 'lucide-react'

interface VeteransSearchProps {
    currentFilter: boolean | undefined
    isWwPage?: boolean
    initialSearch?: string
}

export const VeteransSearch: React.FC<VeteransSearchProps> = ({
    currentFilter,
    isWwPage = false,
    initialSearch = '',
}) => {
    const [searchQuery, setSearchQuery] = useState(initialSearch)
    const [showFilters, setShowFilters] = useState(false)

    return (
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
            <h2 className="text-xl font-semibold mb-4">
                {isWwPage
                    ? 'Поиск ветеранов Великой Отечественной войны'
                    : 'Поиск ветеранов прокуратуры'}
            </h2>

            <form
                method="GET"
                action=""
                className="flex flex-col sm:flex-row gap-3"
            >
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <Search className="w-5 h-5 text-gray-500" />
                    </div>
                    <input
                        type="search"
                        name="search"
                        defaultValue={initialSearch}
                        className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Поиск по имени, фамилии..."
                    />
                    {initialSearch && (
                        <a
                            href="?"
                            className="absolute inset-y-0 end-0 flex items-center pe-3"
                        >
                            <X className="w-4 h-4 text-gray-500 hover:text-gray-700" />
                        </a>
                    )}
                </div>

                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => setShowFilters(!showFilters)}
                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center gap-2"
                    >
                        <Filter className="w-4 h-4" />
                        Фильтры
                    </button>

                    <button
                        type="submit"
                        className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                        Найти
                    </button>
                </div>

                {/* Скрытое поле для сохранения текущего фильтра */}
                {currentFilter !== undefined && (
                    <input
                        type="hidden"
                        name="is_vov_veteran"
                        value={currentFilter.toString()}
                    />
                )}

                {/* Сбросить на первую страницу при поиске */}
                <input type="hidden" name="page" value="1" />
            </form>

            {showFilters && (
                <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <h3 className="text-sm font-medium mb-3">Категория</h3>
                    <div className="flex flex-wrap gap-3">
                        <a
                            href="?"
                            className={`px-3 py-1.5 text-sm rounded-full transition-colors 
                                ${currentFilter === undefined ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'}`}
                        >
                            Все ветераны
                        </a>

                        {isWwPage ? (
                            <a
                                href={`?is_vov_veteran=true&page=1${initialSearch ? `&search=${encodeURIComponent(initialSearch)}` : ''}`}
                                className={`px-3 py-1.5 text-sm rounded-full transition-colors 
                                    ${currentFilter === true ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'}`}
                            >
                                Ветераны ВОВ
                            </a>
                        ) : (
                            <a
                                href={`?is_vov_veteran=false&page=1${initialSearch ? `&search=${encodeURIComponent(initialSearch)}` : ''}`}
                                className={`px-3 py-1.5 text-sm rounded-full transition-colors 
                                    ${currentFilter === false ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'}`}
                            >
                                Члены Совета Ветеранов Прокуратуры
                            </a>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
