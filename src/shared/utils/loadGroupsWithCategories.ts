import axios from 'axios'
import { baseURL } from '../config/apiConfig'
import type { GroupType } from '../types/groupTypes'
import type { CategoryType } from '../types/categoryTypes'
import { fetchCategories } from '../api/fetchCategories'

export const fetchGroupsWithCategories = async (): Promise<
    (GroupType & { categories: CategoryType[] })[]
> => {
    try {
        // Запрашиваем группы
        const response = await axios.get(`${baseURL}news/groups/`)
        const groups: GroupType[] = response.data.results

        // Для каждой группы делаем запрос категорий
        const groupsWithCategories = await Promise.all(
            groups.map(async (group) => {
                const fetchedCategories = await fetchCategories(group.id)
                // Нормализуем категории, добавляя поле path на основе slug
                const normalizedCategories = fetchedCategories.map(
                    (category: CategoryType) => ({
                        ...category,
                        path: `/news/${category.slug}`,
                    })
                )
                // Возвращаем группу с добавленным полем categories
                return {
                    ...group,
                    categories: normalizedCategories,
                }
            })
        )

        return groupsWithCategories
    } catch (error) {
        console.error('Ошибка при получении групп с категориями:', error)
        throw error
    }
}
