import { cn } from '@/lib/utils'
import React from 'react'

interface LoadingSpinnerProps {
    size?: string // Пропс для задания размера
    className?: string // Пропс для произвольных классов
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = 'w-5 h-5', // Стандартный размер
    className, // Дополнительные кастомные классы
}) => {
    return (
        <div className="flex justify-center items-center h-full">
            <div
                className={cn(
                    'border-t-4 border-blue-600 border-solid rounded-full animate-spin', // Стандартные классы
                    size, // Размер
                    className // Дополнительные классы
                )}
            ></div>
        </div>
    )
}

export default LoadingSpinner
