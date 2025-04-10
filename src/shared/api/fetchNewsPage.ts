import axios from 'axios'
import { baseURL } from '../config/apiConfig'

export const fetchNewsPage = async (id: number) => {
    try {
        const response = await axios.get(`${baseURL}news/news/${id}/`)
        return response.data
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error)
        throw error
    }
}
