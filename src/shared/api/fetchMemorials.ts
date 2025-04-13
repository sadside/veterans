import axios from 'axios'
import { baseURL } from '../config/apiConfig'
import type { MemorialTypes } from '../types/memorialsTypes'

export const fetchMemorials = async (): Promise<MemorialTypes[]> => {
    try {
        const response = await axios.get(`${baseURL}/memorials/memorials/`)
        return response.data.results
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error)
        throw error
    }
}
