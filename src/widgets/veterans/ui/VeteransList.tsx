import React from 'react'
import type { Veteran } from '@/shared/api/fetchVeterans'
import { VeteranCard } from './VeteranCard'
import { Pagination } from '@/components/ui/pagination'

interface VeteransListProps {
    veterans: Veteran[]
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
    isLoading?: boolean
}

export const VeteransList: React.FC<VeteransListProps> = ({
    veterans,
    currentPage,
    totalPages,
    onPageChange,
    isLoading = false,
}) => {
    // Скелетоны для отображения во время загрузки
    const renderSkeletons = () => (
        <>
            {Array.from({ length: 12 }).map((_, index) => (
                <div
                    key={`skeleton-${index}`}
                    className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full animate-pulse"
                >
                    <div className="w-full aspect-square bg-gray-200" />
                    <div className="p-4 flex-1 flex flex-col">
                        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                        <div className="mt-auto pt-4">
                            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )

    // Сообщение о пустом списке
    const renderEmptyState = () => (
        <div className="col-span-full py-12 flex items-center justify-center flex-col text-center">
            <svg
                className="w-16 h-16 text-gray-300 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M12 4.354a4 4 0 100 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                ></path>
            </svg>
            <h3 className="text-xl font-medium text-gray-500 mb-1">
                Ветераны не найдены
            </h3>
            <p className="text-gray-400">
                Попробуйте изменить параметры поиска или фильтрации
            </p>
        </div>
    )

    return (
        <div className="mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {isLoading
                    ? renderSkeletons()
                    : veterans.length > 0
                      ? veterans.map((veteran) => (
                            <VeteranCard key={veteran.id} veteran={veteran} />
                        ))
                      : renderEmptyState()}
            </div>

            {/* Пагинация */}
            {!isLoading && veterans.length > 0 && totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                    <Pagination
                        className="mx-auto"
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={onPageChange}
                        siblingsCount={1}
                    />
                </div>
            )}
        </div>
    )
}
