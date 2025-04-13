import axios from 'axios'
import { baseURL } from '../config/apiConfig'
import type { BirthdayType } from '../types/birtdayTypes'

export const fetchVeteransBirthday = async (): Promise<BirthdayType[]> => {
    try {
        const response = await axios.get(`${baseURL}/veterans/birthday/`)
        return response.data.results
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error)
        throw error
    }
}
