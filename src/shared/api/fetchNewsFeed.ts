import axios from 'axios'
import { baseURL } from '../config/apiConfig'

export interface NewsItem {
    id: number
    title: string
    content: string
    image: string
    published_at: string
    category: {
        id: number
        name: string
        group: {
            id: number
            name: string
            slug: string
        }
    }
}

export interface NewsResponse {
    count: number
    next: string | null
    previous: string | null
    results: NewsItem[]
}

export const fetchNewsFeed = async (): Promise<NewsResponse> => {
    try {
        const response = await axios.get(`${baseURL}news/feed/`)
        return response.data
    } catch (error) {
        console.error('Ошибка при выполнении запроса к API новостей:', error)
        return {
            count: 0,
            next: null,
            previous: null,
            results: [],
        }
    }
}
