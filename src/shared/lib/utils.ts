import { clsx } from 'clsx'
import type { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Объединяет классы tailwind с помощью clsx и tailwind-merge
 * Позволяет комбинировать условные классы и разрешать конфликты
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
