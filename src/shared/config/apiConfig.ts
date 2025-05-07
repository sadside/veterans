// Получаем переменные окружения или используем значения по умолчанию
// В продакшене эти значения должны быть определены в .env файле
const apiHost = import.meta.env.PUBLIC_API_HOST || '81.31.247.179'
const apiBaseUrl = import.meta.env.PUBLIC_API_BASE_URL || `http://${apiHost}`
const apiFullUrl = import.meta.env.PUBLIC_API_FULL_URL || `${apiBaseUrl}/api/`

export const baseURL = apiFullUrl

// Проверка и форматирование URL изображения
export const getImageUrl = (imageUrl: string): string => {
    return imageUrl
    if (!imageUrl) return ''

    // Если URL уже полный, возвращаем его как есть
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
        return imageUrl
    }

    // Если URL начинается с /, добавляем базовый домен
    if (imageUrl.startsWith('/')) {
        return `${apiBaseUrl}${imageUrl}`
    }

    // Для прочих случаев, соединяем с доменом API
    return `${apiBaseUrl}/${imageUrl}`
}
