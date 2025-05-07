import React, { useState } from 'react'
import { getImageUrl } from '@/shared/config/apiConfig'

interface ImageWithFallbackProps
    extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string
    alt?: string
    className?: string
    fallbackClassName?: string
    iconClassName?: string
}

/**
 * Компонент для отображения изображений с заглушкой
 * Если изображение отсутствует или не загрузилось, показывает SVG-заглушку
 */
export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
    src,
    alt = '',
    className = '',
    fallbackClassName = '',
    iconClassName = 'h-24 w-24 text-blue-200',
    ...props
}) => {
    const [imageError, setImageError] = useState(false)

    // Обработчик ошибки загрузки изображения
    const handleImageError = () => {
        setImageError(true)
    }

    // Проверяем, есть ли изображение (не пустая строка, null или undefined)
    const hasImage = !!src && src !== ''

    // Показываем заглушку, если изображения нет или была ошибка загрузки
    const showPlaceholder = !hasImage || imageError

    const finalSrc = hasImage ? getImageUrl(src) : ''

    // Если нужна заглушка, возвращаем ее
    if (showPlaceholder) {
        return (
            <div
                className={`flex items-center justify-center bg-blue-50 ${fallbackClassName || className}`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={iconClassName}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                </svg>
            </div>
        )
    }

    // Иначе возвращаем изображение
    return (
        <img
            src={finalSrc}
            alt={alt}
            className={className}
            onError={handleImageError}
            {...props}
        />
    )
}
