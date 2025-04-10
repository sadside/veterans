import { useEffect, useState } from 'react'
import MainLogo from '../../../assets/icons/main-logo.png'
import prosecution from '../../../assets/icons/prosecution.svg'
import { motion } from 'framer-motion'
import type { GroupType } from '@/widgets/navbar/ui'
import {
    fetchCategories,
    type CategoryType,
} from '@/shared/api/fetchCategories'
import LoadingSpinner from '@/shared/ui/loadingSpinner/LoadingSpinner'
import { parseHtmlToReact } from '@/shared/lib/parse-html'

type Props = {
    toggleMobileMenu: () => void
    isMobileMenuOpen: boolean
    groups: GroupType[]
}

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

export const NavbarMobile = ({
    toggleMobileMenu,
    isMobileMenuOpen,
    groups,
}: Props) => (
    <div className="fixed top-0 left-0 w-full bg-white z-20 flex justify-center items-center px-4 py-3 border-b border-gray-200">
        <div className="w-full max-w-[600px] flex justify-between items-center">
            <button onClick={toggleMobileMenu} className="focus:outline-none">
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {isMobileMenuOpen ? (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    ) : (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    )}
                </svg>
            </button>
            <div className="flex items-center space-x-4">
                <img src={MainLogo.src} width={50} alt="Логотип" />
                <img
                    src={prosecution.src}
                    width={40}
                    alt="360"
                    className="cursor-pointer"
                />
            </div>
        </div>
    </div>
)

export const MobileVerticalMenu = ({
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
                                    if (!categoriesByGroup[group.id]) {
                                        try {
                                            // Отмечаем начало загрузки категорий для этой группы
                                            setIsLoadingCategories((prev) => ({
                                                ...prev,
                                                [group.id]: true,
                                            }))
                                            const fetchedCategories =
                                                await fetchCategories(group.id)

                                            // Нормализуем данные, добавляя поле path, например, формируя его на основе slug
                                            const normalizedCategories =
                                                fetchedCategories.map(
                                                    (category) => ({
                                                        ...category,
                                                        path: `/news/${category.slug}`,
                                                    })
                                                )

                                            // Обновляем состояние категорий
                                            setCategoriesByGroup((prev) => ({
                                                ...prev,
                                                [group.id]:
                                                    normalizedCategories,
                                            }))
                                        } catch (error) {
                                            console.error(
                                                `Ошибка при загрузке категорий для группы ${group.id}:`,
                                                error
                                            )
                                        } finally {
                                            // Завершаем загрузку категорий для этой группы
                                            setIsLoadingCategories((prev) => ({
                                                ...prev,
                                                [group.id]: false,
                                            }))
                                        }
                                    }
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
                                                <span className="text-sm font-medium text-muted-foreground">
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
