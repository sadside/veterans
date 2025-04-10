import { useState, useEffect, useMemo } from 'react'
import type { NewsItem } from '../types'
import { fetchNewsByCategory } from '@/shared/api/fetchNewsByCategory'

const PAGE_SIZE = 5

export const usePaginatedNews = (categoryId: number, groupId: number) => {
    const [news, setNews] = useState<NewsItem[]>([]) // Новые новости для текущей страницы
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Мемоизация новостей для предотвращения повторной загрузки
    const newsPages = useMemo(() => {
        const pages: Record<number, NewsItem[]> = {}
        return pages
    }, [])

    // Загружаем новости при изменении страницы
    useEffect(() => {
        const loadNews = async () => {
            // Загружаем новости для текущей страницы
            try {
                setLoading(true)
                const data = await fetchNewsByCategory({
                    categoryId,
                    groupId,
                    page: currentPage,
                    pageSize: PAGE_SIZE,
                })

                // Сохраняем новости только для текущей страницы
                newsPages[currentPage] = data.results
                setNews(data.results) // Теперь новости заменяются для каждой страницы

                setTotalPages(data.total_pages)
            } catch (err) {
                setError('Ошибка при загрузке новостей')
            } finally {
                setLoading(false)
            }
        }

        loadNews()
    }, [categoryId, groupId, currentPage, newsPages])

    // Динамическая загрузка новостей для текущей страницы
    const paginatedNews = useMemo(() => {
        return news // Теперь в news всегда содержатся только новости для текущей страницы
    }, [news, currentPage])

    // Функции для изменения страницы
    const nextPage = () =>
        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
    const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))

    return {
        paginatedNews,
        currentPage,
        totalPages,
        loading,
        error,
        PAGE_SIZE,
        setCurrentPage,
        nextPage,
        prevPage,
    }
}
