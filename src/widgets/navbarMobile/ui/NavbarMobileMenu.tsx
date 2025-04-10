import { fetchCategories } from '@/shared/api/fetchCategories'
import LoadingSpinner from '@/shared/ui/loadingSpinner/LoadingSpinner'
import { parseHtmlToReact } from '@/shared/lib/parse-html'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { GroupType } from '@/shared/types/groupTypes'
import type { CategoryType } from '@/shared/types/categoryTypes'
import { loadCategoriesForGroup } from '@/shared/utils/loadCategoriesForGroup'
const menuVariants = {
    initial: { scaleY: 0, opacity: 0 },
    open: { scaleY: 1, opacity: 1 },
    closed: { scaleY: 0, opacity: 1 },
}

const detailVariants = {
    initial: { x: -100, opacity: 0 },
    open: { x: 0, opacity: 1 },
    closed: { x: 100, opacity: 0 },
}
export const MobileMobileMenu = ({
    isMobileMenuOpen,
    groups,
}: {
    isMobileMenuOpen: boolean
    groups: GroupType[]
}) => {
    const [selectedGroup, setSelectedGroup] = useState<number | null>(null)

    const imgStyle = 'w-full h-full object-cover rounded-sm'

    // Сброс выбранной группы при закрытии меню
    useEffect(() => {
        if (!isMobileMenuOpen) {
            const timeout = setTimeout(() => setSelectedGroup(null), 400) // совпадает с duration
            return () => clearTimeout(timeout)
        }
    }, [isMobileMenuOpen])

    // Храним полученные категории для каждой группы (id группы — массив категорий)
    const [categoriesByGroup, setCategoriesByGroup] = useState<
        Record<number, CategoryType[]>
    >({})
    const [isLoadingCategories, setIsLoadingCategories] = useState<
        Record<number, boolean>
    >({})

    return (
        <motion.div
            key="mobile-menu"
            variants={menuVariants}
            initial="initial"
            animate={isMobileMenuOpen ? 'open' : 'closed'}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            style={{ transformOrigin: 'top' }}
            className="fixed top-[60px] left-0 w-full h-[calc(100vh-60px)] bg-white shadow-lg z-[9999] flex flex-col lg:hidden overflow-hidden"
        >
            <div className="flex flex-1 overflow-hidden">
                {/* Левая колонка – список групп */}
                <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
                    <ul className="flex flex-col">
                        {groups.map((group, index) => (
                            <li
                                key={index}
                                onClick={async () => {
                                    setSelectedGroup(index)
                                    loadCategoriesForGroup(
                                        group.id,
                                        categoriesByGroup,
                                        setCategoriesByGroup,
                                        setIsLoadingCategories
                                    )
                                }}
                                className={`border-b border-gray-200 p-3 text-[16px] cursor-pointer hover:bg-gray-100 
                                ${selectedGroup === index ? 'font-semibold bg-gray-100' : ''}`}
                            >
                                {group.name}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Правая колонка – детали выбранной группы */}
                <div className="w-2/3 p-4 overflow-y-auto">
                    {selectedGroup !== null && groups[selectedGroup] && (
                        <motion.div
                            key={selectedGroup}
                            variants={detailVariants}
                            initial="initial"
                            animate={isMobileMenuOpen ? 'open' : 'closed'}
                            transition={{
                                duration: 0.5,
                                ease: 'easeInOut',
                            }}
                        >
                            {/* Оборачиваем весь контент в ссылку */}
                            <a
                                href={`/categoryNews?category_id=${groups[selectedGroup].id}&group_id=${groups[selectedGroup].id}`}
                                className="block mb-4"
                            >
                                {/* Добавляем изображение группы */}
                                <img
                                    src={groups[selectedGroup].image}
                                    className={imgStyle}
                                    alt={groups[selectedGroup].name}
                                />
                            </a>

                            {isLoadingCategories[groups[selectedGroup].id] ? (
                                <div className="flex justify-center">
                                    <LoadingSpinner size="w-8 h-8" />
                                </div>
                            ) : categoriesByGroup[groups[selectedGroup].id] ? (
                                categoriesByGroup[groups[selectedGroup].id].map(
                                    (category) => (
                                        <div key={category.id}>
                                            <a
                                                href={`/categoryNews?category_id=${category.id}&group_id=${groups[selectedGroup].id}`}
                                                className="block mb-1 cursor-pointer hover:bg-gray-100 px-2 pb-2 transition-all rounded-md"
                                            >
                                                <span className="text-sm font-medium ">
                                                    {category.name}
                                                </span>
                                                <span className="text-xs text-gray-600 block hover:underline">
                                                    {parseHtmlToReact(
                                                        category.description
                                                    )}
                                                </span>
                                            </a>
                                        </div>
                                    )
                                )
                            ) : (
                                <div>Нет категорий для отображения</div>
                            )}

                            {groups[selectedGroup].links?.length ? (
                                <div className="space-y-4">
                                    {groups[selectedGroup].links.map((link) => (
                                        <div key={link.name}>
                                            <div className="font-semibold text-base mb-1">
                                                {link.name}
                                            </div>
                                            <p className="text-sm text-gray-700">
                                                {link.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500"></p>
                            )}
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    )
}
