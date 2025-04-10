import axios from 'axios'
import { baseURL } from '../config/apiConfig'
import type { CategoryType } from '../types/categoryTypes'

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
