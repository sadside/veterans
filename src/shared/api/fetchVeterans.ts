import { baseURL } from '@/shared/config/apiConfig'

export interface Veteran {
    id: number
    name: string
    surname: string
    patronymic: string
    full_name: string
    birthday: string
    image: string
    is_vov_veteran: boolean
    created_at: string
    updated_at: string
}

export interface VeteransResponse {
    count: number
    next: string | null
    previous: string | null
    results: Veteran[]
}

export interface FetchVeteransParams {
    page?: number
    page_size?: number
    search?: string
    is_vov_veteran?: boolean
}

export const fetchVeterans = async ({
    page = 1,
    page_size = 12,
    search = '',
    is_vov_veteran,
}: FetchVeteransParams): Promise<VeteransResponse> => {
    try {
        const queryParams = new URLSearchParams()

        queryParams.append('page', page.toString())
        queryParams.append('page_size', page_size.toString())

        if (search) {
            queryParams.append('search', search)
        }

        if (is_vov_veteran !== undefined) {
            queryParams.append('is_vov_veteran', is_vov_veteran.toString())
        }

        const response = await fetch(
            `${baseURL}/veterans/veterans/?${queryParams.toString()}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )

        if (!response.ok) {
            throw new Error('Failed to fetch veterans')
        }

        return await response.json()
    } catch (error) {
        console.error('Error fetching veterans:', error)
        // Возвращаем пустой результат в случае ошибки
        return {
            count: 0,
            next: null,
            previous: null,
            results: [],
        }
    }
}
