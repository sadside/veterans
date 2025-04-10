import axios from 'axios'
import { baseURL } from '../config/apiConfig'

// Обновлённая типизация для категории с учетом вложенного объекта group
export type CategoryType = {
    id: number
    group: {
        id: number
        name: string
        image: string
        slug: string
        created_at: string
    }
    name: string
    description: string
    slug: string
    created_at: string
}

export const fetchCategories = async (
    groupId: number
): Promise<CategoryType[]> => {
    try {
        const response = await axios.get(
            `${baseURL}news/groups/${groupId}/categories/`
        )
        // Возвращаем только массив results
        return response.data.results
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error)
        throw error
    }
}
