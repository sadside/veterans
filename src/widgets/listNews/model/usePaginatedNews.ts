import { useState, useMemo } from 'react'
import newsImage from '../../../assets/images/popover1.jpg'
import type { NewsItem } from '../types'

const PAGE_SIZE = 5

const generateNews = (count: number): NewsItem[] =>
    Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        title: `Заголовок ${i + 1}`,
        description: `Описание ${i + 1}. Lorem ipsum dolor sit amet.`,
        image: i % 7 === 0 ? '' : newsImage.src,
    }))

export const usePaginatedNews = () => {
    // Генерация новостей (в реальном проекте, возможно, они приходят с API)
    const newsWithImages = useMemo(
        () => generateNews(50).filter((n) => n.image),
        []
    )

    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = Math.ceil(newsWithImages.length / PAGE_SIZE)

    // Динамическая загрузка новостей для текущей страницы
    const paginatedNews = useMemo(() => {
        const start = (currentPage - 1) * PAGE_SIZE
        return newsWithImages.slice(start, start + PAGE_SIZE)
    }, [newsWithImages, currentPage])

    return {
        paginatedNews,
        currentPage,
        totalPages,
        setCurrentPage,
    }
}
