export const baseURL = 'http://81.31.247.179/api/'

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
        return `http://81.31.247.179${imageUrl}`
    }

    // Для прочих случаев, соединяем с доменом API
    return `http://81.31.247.179/${imageUrl}`
}
