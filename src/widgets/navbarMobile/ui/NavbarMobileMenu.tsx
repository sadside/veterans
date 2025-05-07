import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

import { parseHtmlToReact } from '@/shared/lib/parse-html'
import type { GroupType } from '@/shared/types/groupTypes'
import type { CategoryType } from '@/shared/types/categoryTypes'
import { ImageWithFallback } from '@/shared/ui/ImageWithFallback'

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
    navbarData,
}: {
    isMobileMenuOpen: boolean
    navbarData: GroupType[] // получаем данные о группах и категориях
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
                <div className="w-1/3 border-r border-gray-200 overflow-y-auto flex flex-col">
                    <a
                        href="/memorials"
                        className="text-[25px] font-sign hover:text-[#1570EF] transition-colors p-3 border-b border-gray-200"
                    >
                        Мемориалы
                    </a>
                    <a
                        href="/documents"
                        className="text-[25px] font-sign hover:text-[#1570EF] transition-colors p-3 border-b border-gray-200"
                    >
                        Документы
                    </a>

                    <ul className="flex flex-col">
                        {navbarData.map((group, index) => (
                            <li
                                key={index}
                                onClick={() => setSelectedGroup(index)}
                                className="border-b border-gray-200 p-3 text-[25px] cursor-pointer hover:bg-gray-100 font-sign"
                            >
                                {group.name}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Правая колонка – детали выбранной группы */}
                <div className="w-2/3 p-4 overflow-y-auto">
                    {selectedGroup !== null && navbarData[selectedGroup] && (
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
                                href={`/categoryNews?category_id=${navbarData[selectedGroup].id}&group_id=${navbarData[selectedGroup].id}`}
                                className="block mb-4 relative "
                            >
                                {/* Контейнер для картинки с затемнением */}
                                <div className="relative">
                                    <ImageWithFallback
                                        src={navbarData[selectedGroup].image}
                                        className={imgStyle}
                                        alt={navbarData[selectedGroup].name}
                                    />
                                    {/* Черное затемнение */}
                                    <div className="absolute inset-0 bg-black opacity-40 rounded-sm"></div>
                                </div>
                            </a>

                            {/* Рендерим категории для выбранной группы */}
                            {navbarData[selectedGroup].categories?.length ? (
                                navbarData[selectedGroup].categories.map(
                                    (category: CategoryType) => (
                                        <div key={category.id}>
                                            <a
                                                href={`/categoryNews/${navbarData[selectedGroup].slug}/${category.slug}?category_id=${category.id}&group_id=${navbarData[selectedGroup].id}`}
                                                className="block mb-1 cursor-pointer hover:bg-gray-100 px-2 pb-2 transition-all rounded-md"
                                            >
                                                <span className="text-sm font-medium">
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

                            {navbarData[selectedGroup].links?.length ? (
                                <div className="space-y-4">
                                    {navbarData[selectedGroup].links.map(
                                        (link) => (
                                            <div key={link.name}>
                                                <div className="font-semibold text-base mb-1">
                                                    {link.name}
                                                </div>
                                                <p className="text-sm text-gray-700">
                                                    {link.description}
                                                </p>
                                            </div>
                                        )
                                    )}
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
