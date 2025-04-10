import axios from 'axios'
import { baseURL } from '../config/apiConfig'

export const fetchGroups = async () => {
    try {
        const response = await axios.get(`${baseURL}news/groups/`)
        return response.data.results
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error)
        throw error
    }
}
