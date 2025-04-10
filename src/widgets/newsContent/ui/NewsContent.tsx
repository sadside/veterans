import { useEffect, useState } from 'react'
import { fetchNewsPage } from '@/shared/api/fetchNewsPage'
import { parseHtmlToReact } from '@/shared/lib/parse-html'
import LoadingSpinner from '@/shared/ui/loadingSpinner/LoadingSpinner'

export const NewsContent = () => {
    const [news, setNews] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const newsId = new URLSearchParams(window.location.search).get(
            'news_id'
        )
        if (!newsId) return

        const loadNews = async () => {
            try {
                setLoading(true)
                const data = await fetchNewsPage(Number(newsId))
                setNews(data)
            } catch {
                setError('Ошибка при загрузке новости')
            } finally {
                setLoading(false)
            }
        }

        loadNews()
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <LoadingSpinner size="w-16 h-16" />
            </div>
        )
    }

    if (error || !news) {
        return (
            <div className="text-center text-red-500">
                {error ?? 'Новость не найдена'}
            </div>
        )
    }

    return (
        <article className="prose max-w-none">
            {parseHtmlToReact(news.content)}
        </article>
    )
}
