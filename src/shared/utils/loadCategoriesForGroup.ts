// src/shared/utils/loadCategoriesForGroup.ts
import type { CategoryType } from '@/shared/types/categoryTypes'
import { fetchCategories } from '@/shared/api/fetchCategories'
import type { Dispatch, SetStateAction } from 'react'

export const loadCategoriesForGroup = async (
    groupId: number,
    categoriesByGroup: Record<number, CategoryType[]>,
    setCategoriesByGroup: Dispatch<
        SetStateAction<Record<number, CategoryType[]>>
    >,
    setIsLoadingCategories: Dispatch<SetStateAction<Record<number, boolean>>>
) => {
    if (!categoriesByGroup[groupId]) {
        // Отмечаем начало загрузки категорий для данной группы
        setIsLoadingCategories((prev) => ({ ...prev, [groupId]: true }))
        try {
            const fetched = await fetchCategories(groupId)
            // Нормализуем данные, добавляя поле path, формируя его на основе slug
            const normalized = fetched.map((category: CategoryType) => ({
                ...category,
                path: `/news/${category.slug}`,
            }))
            // Обновляем состояние, добавляя полученные категории для группы
            setCategoriesByGroup((prev) => ({
                ...prev,
                [groupId]: normalized,
            }))
        } catch (error) {
            console.error(
                `Ошибка при загрузке категорий для группы ${groupId}:`,
                error
            )
        } finally {
            // Завершаем загрузку категорий для данной группы
            setIsLoadingCategories((prev) => ({ ...prev, [groupId]: false }))
        }
    }
}
