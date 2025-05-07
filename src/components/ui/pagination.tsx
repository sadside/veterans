import React from 'react'
import { cn } from '@/shared/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
    siblingsCount?: number
    className?: string
}

export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    siblingsCount = 1,
    className,
}) => {
    // Генерация массива страниц для отображения
    const generatePaginationArray = () => {
        // Всегда показываем первую и последнюю страницу
        // И siblingsCount страниц до и после текущей

        const range = (start: number, end: number) =>
            Array.from({ length: end - start + 1 }, (_, i) => start + i)

        // Начальные и конечные страницы
        const firstPage = 1
        const lastPage = totalPages

        // Диапазон страниц вокруг текущей
        let startPage = Math.max(firstPage, currentPage - siblingsCount)
        let endPage = Math.min(lastPage, currentPage + siblingsCount)

        // Массив для хранения номеров страниц и разделителей
        const pages: (number | string)[] = []

        // Добавляем первую страницу
        pages.push(firstPage)

        // Добавляем разделитель, если нужно
        if (startPage > firstPage + 1) {
            pages.push('...')
        } else if (startPage === firstPage + 1) {
            pages.push(firstPage + 1)
        }

        // Добавляем страницы в середине (если они не совпадают с первой/последней)
        for (let i = startPage; i <= endPage; i++) {
            if (i !== firstPage && i !== lastPage) {
                pages.push(i)
            }
        }

        // Добавляем разделитель, если нужно
        if (endPage < lastPage - 1) {
            pages.push('...')
        } else if (endPage === lastPage - 1) {
            pages.push(lastPage - 1)
        }

        // Добавляем последнюю страницу, если она не совпадает с первой
        if (lastPage !== firstPage) {
            pages.push(lastPage)
        }

        return pages
    }

    const pages = generatePaginationArray()

    return (
        <div
            className={cn(
                'flex items-center justify-center space-x-2',
                className
            )}
        >
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={cn(
                    'flex items-center justify-center w-10 h-10 rounded-md',
                    'transition-colors duration-200',
                    currentPage === 1
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-700 hover:bg-blue-100'
                )}
                aria-label="Предыдущая страница"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            {pages.map((page, index) => (
                <React.Fragment key={index}>
                    {typeof page === 'number' ? (
                        <button
                            onClick={() => onPageChange(page)}
                            className={cn(
                                'flex items-center justify-center w-10 h-10 rounded-md',
                                'transition-colors duration-200',
                                currentPage === page
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-700 hover:bg-blue-100'
                            )}
                            aria-current={
                                currentPage === page ? 'page' : undefined
                            }
                            aria-label={`Страница ${page}`}
                        >
                            {page}
                        </button>
                    ) : (
                        <span className="flex items-center justify-center w-10 h-10 text-gray-500">
                            {page}
                        </span>
                    )}
                </React.Fragment>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={cn(
                    'flex items-center justify-center w-10 h-10 rounded-md',
                    'transition-colors duration-200',
                    currentPage === totalPages
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-700 hover:bg-blue-100'
                )}
                aria-label="Следующая страница"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    )
}
