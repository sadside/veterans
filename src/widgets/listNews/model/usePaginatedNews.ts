import { useState, useEffect } from 'react'
import { fetchNewsByCategory } from '@/shared/api/fetchNewsByCategory'
import type { NewsItem, NewsTypes } from '@/shared/types/newsTypes'

const PAGE_SIZE = 5

export const usePaginatedNews = (
    categoryId: number,
    groupId: number,
    newsData: NewsTypes
) => {
    // Храним данные для каждой страницы
    const [newsPages, setNewsPages] = useState<Record<number, NewsItem[]>>({})
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const loadNews = async () => {
            // Если данные для текущей страницы уже загружены, просто выключаем загрузку
            if (newsPages[currentPage]) {
                setLoading(false)
                return
            }
            setLoading(true)
            try {
                setNewsPages((prev) => ({
                    ...prev,
                    [currentPage]: newsData.results, // Используем данные из newsData
                }))
                setTotalPages(newsData.total_pages) // Используем total_pages из newsData
            } catch (err) {
                setError('Ошибка при загрузке новостей')
            } finally {
                setLoading(false)
            }
        }
        loadNews()
    }, [categoryId, groupId, currentPage, newsPages, newsData]) // Обновляем зависимости

    const paginatedNews = newsPages[currentPage] || []

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
