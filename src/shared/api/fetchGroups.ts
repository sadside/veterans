import axios from 'axios'
import { baseURL } from '../config/apiConfig'
import type { GroupType } from '../types/groupTypes'

export const fetchGroups = async (): Promise<GroupType[]> => {
    try {
        const response = await axios.get(`${baseURL}news/groups/`)
        return response.data.results
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error)
        throw error
    }
}
