import { fetchNewsPage } from '@/shared/api/fetchNewsPage'
import { parseHtmlToReact } from '@/shared/lib/parse-html'
import { useEffect, useState } from 'react'
import LoadingSpinner from '@/shared/ui/loadingSpinner/LoadingSpinner' // Импортируем компонент спиннера

export const NewsContent = () => {
    const [news, setNews] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search)
        const newsId = queryParams.get('news_id')

        if (newsId) {
            fetchNews(newsId)
        }
    }, [])

    const fetchNews = async (id: string) => {
        try {
            setLoading(true)
            const data = await fetchNewsPage(Number(id))
            setNews(data)
        } catch (err) {
            setError('Ошибка при загрузке новости')
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <LoadingSpinner size="w-16 h-16" />{' '}
                {/* Спиннер по центру экрана */}
            </div>
        )
    }

    if (error) {
        return <div>{error}</div>
    }

    if (!news) {
        return <div>Новость не найдена</div>
    }

    return (
        <article className="prose max-w-none">
            <h2>{news.title}</h2>
            {parseHtmlToReact(news.content)}
        </article>
    )
}
