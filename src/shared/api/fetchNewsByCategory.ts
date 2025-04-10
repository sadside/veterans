import axios from 'axios'
import { baseURL } from '../config/apiConfig'

interface FetchNewsParams {
    categoryId: number
    groupId: number
    page?: number
    pageSize?: number
}

export const fetchNewsByCategory = async ({
    categoryId,
    groupId,
    page,
    pageSize = 5,
}: FetchNewsParams) => {
    try {
        const response = await axios.get(`${baseURL}news/news/`, {
            params: {
                category_id: categoryId,
                group_id: groupId,
                page,
                page_size: pageSize,
            },
        })
        return response.data
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error)
        throw error
    }
}
