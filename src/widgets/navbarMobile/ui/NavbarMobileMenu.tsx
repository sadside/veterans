import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

import { parseHtmlToReact } from '@/shared/lib/parse-html'
import type { GroupType } from '@/shared/types/groupTypes'
import type { CategoryType } from '@/shared/types/categoryTypes'
import { ImageWithFallback } from '@/shared/ui/ImageWithFallback'

const menuVariants = {
    initial: { opacity: 0 },
    open: { opacity: 1 },
    closed: { opacity: 0 },
}

const menuContainerVariants = {
    initial: { y: '-100%' },
    open: { y: 0 },
    closed: { y: '-100%' },
}

const menuItemVariants = {
    initial: { opacity: 0, y: 20 },
    open: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.05, duration: 0.3 },
    }),
    closed: { opacity: 0, y: 20 },
}

const contentVariants = {
    initial: { opacity: 0, x: '100%' },
    enter: {
        opacity: 1,
        x: 0,
        transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
    exit: { opacity: 0, x: '-100%', transition: { duration: 0.2 } },
}

// Иконка для пунктов меню
const MenuIcon = ({ active = false }: { active?: boolean }) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-shrink-0"
        >
            <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="6"
                fill={active ? '#1570EF' : '#223065'}
                fillOpacity={active ? '0.1' : '0.05'}
            />
            <circle
                cx="12"
                cy="12"
                r="3"
                fill={active ? '#1570EF' : '#223065'}
                fillOpacity={active ? '1' : '0.7'}
            />
        </svg>
    )
}

// Тип для режима отображения меню
type MenuMode = 'main' | 'veterans' | 'category'

export const MobileMobileMenu = ({
    isMobileMenuOpen,
    navbarData,
}: {
    isMobileMenuOpen: boolean
    navbarData: GroupType[]
}) => {
    // Режим отображения меню (главное меню, ветераны, конкретная категория)
    const [menuMode, setMenuMode] = useState<MenuMode>('main')
    const [selectedGroup, setSelectedGroup] = useState<number | null>(null)

    const imgStyle = 'w-full h-[180px] object-cover rounded-lg'

    // Сброс состояния при закрытии меню
    useEffect(() => {
        if (!isMobileMenuOpen) {
            const timeout = setTimeout(() => {
                setMenuMode('main')
                setSelectedGroup(null)
            }, 400)
            return () => clearTimeout(timeout)
        }
    }, [isMobileMenuOpen])

    // Функция возврата к главному меню
    const goBack = () => {
        setMenuMode('main')
        setSelectedGroup(null)
    }

    // Открытие раздела ветеранов
    const openVeterans = () => {
        setMenuMode('veterans')
    }

    // Открытие категории
    const openCategory = (index: number) => {
        setSelectedGroup(index)
        setMenuMode('category')
    }

    return (
        <AnimatePresence>
            {isMobileMenuOpen && (
                <motion.div
                    key="mobile-menu-overlay"
                    variants={menuVariants}
                    initial="initial"
                    animate="open"
                    exit="closed"
                    transition={{ duration: 0.3 }}
                    className="fixed inset-[60px_0_0_0] bg-black/50 z-[19] backdrop-blur-sm lg:hidden"
                />
            )}
            <motion.div
                key="mobile-menu"
                variants={menuContainerVariants}
                initial="initial"
                animate={isMobileMenuOpen ? 'open' : 'closed'}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-[60px] left-0 w-full h-[calc(100vh-60px)] bg-white z-[19] flex flex-col lg:hidden overflow-hidden"
            >
                <AnimatePresence mode="wait">
                    {/* Главное меню */}
                    {menuMode === 'main' && (
                        <motion.div
                            key="main-menu"
                            variants={contentVariants}
                            initial="initial"
                            animate="enter"
                            exit="exit"
                            className="w-full h-full overflow-y-auto px-2"
                        >
                            <div className="flex flex-col py-2 space-y-1">
                                <motion.a
                                    href="/memorials"
                                    className="flex items-center text-[21px] font-sign text-[#1f2b52] hover:text-[#1570EF] transition-all px-4 py-4 rounded-xl hover:bg-[#f8f9ff] active:bg-[#f0f4ff]"
                                    variants={menuItemVariants}
                                    initial="initial"
                                    animate="open"
                                    custom={0}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <MenuIcon />
                                    <span className="ml-3">Мемориалы</span>
                                </motion.a>

                                <motion.div
                                    className="flex items-center justify-between text-[21px] font-sign text-[#1f2b52] hover:text-[#1570EF] transition-all px-4 py-4 rounded-xl hover:bg-[#f8f9ff] active:bg-[#f0f4ff] cursor-pointer"
                                    variants={menuItemVariants}
                                    initial="initial"
                                    animate="open"
                                    custom={1}
                                    onClick={openVeterans}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="flex items-center">
                                        <MenuIcon />
                                        <span className="ml-3">Ветераны</span>
                                    </div>
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        className="text-[#1f2b52]"
                                    >
                                        <path
                                            d="M10 17L15 12L10 7"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </motion.div>

                                {navbarData.map((group, index) => (
                                    <motion.div
                                        key={group.id || index}
                                        className="flex items-center justify-between text-[21px] font-sign text-[#1f2b52] hover:text-[#1570EF] transition-all px-4 py-4 rounded-xl hover:bg-[#f8f9ff] active:bg-[#f0f4ff] cursor-pointer"
                                        variants={menuItemVariants}
                                        initial="initial"
                                        animate="open"
                                        custom={index + 2}
                                        onClick={() => openCategory(index)}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div className="flex items-center">
                                            <MenuIcon />
                                            <span className="ml-3">
                                                {group.name}
                                            </span>
                                        </div>
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            className="text-[#1f2b52]"
                                        >
                                            <path
                                                d="M10 17L15 12L10 7"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Раздел Ветеранов */}
                    {menuMode === 'veterans' && (
                        <motion.div
                            key="veterans-content"
                            variants={contentVariants}
                            initial="initial"
                            animate="enter"
                            exit="exit"
                            className="w-full h-full overflow-y-auto"
                        >
                            <div className="bg-[#f8f9ff] p-4 flex items-center text-[#1f2b52] sticky top-0 z-10 border-b border-gray-100">
                                <button
                                    onClick={goBack}
                                    className="rounded-full p-2 hover:bg-white mr-2 transition-all"
                                >
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M15 19L8 12L15 5"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                                <h2 className="text-xl font-sign">Ветераны</h2>
                            </div>

                            <div className="p-4 space-y-4">
                                <motion.a
                                    href="/veterans/ww2"
                                    className="block p-4 bg-white rounded-xl border border-[#e0e7ff] shadow-sm hover:border-[#c7d2fe] transition-all"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <h3 className="text-lg font-medium text-[#223065] mb-1">
                                        Ветераны Великой Отечественной войны
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Информация о ветеранах, участвовавших в
                                        Великой Отечественной войне, их подвигах
                                        и наградах
                                    </p>
                                </motion.a>

                                <motion.a
                                    href="/veterans/prosecution"
                                    className="block p-4 bg-white rounded-xl border border-[#e0e7ff] shadow-sm hover:border-[#c7d2fe] transition-all"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <h3 className="text-lg font-medium text-[#223065] mb-1">
                                        Члены Совета Ветеранов Прокуратуры
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Информация о ветеранах органов
                                        прокуратуры, их профессиональном пути и
                                        достижениях
                                    </p>
                                </motion.a>
                            </div>
                        </motion.div>
                    )}

                    {/* Страница категории */}
                    {menuMode === 'category' &&
                        selectedGroup !== null &&
                        navbarData[selectedGroup] && (
                            <motion.div
                                key={`category-${selectedGroup}`}
                                variants={contentVariants}
                                initial="initial"
                                animate="enter"
                                exit="exit"
                                className="w-full h-full overflow-y-auto"
                            >
                                <div className="bg-[#f8f9ff] p-4 flex items-center text-[#1f2b52] sticky top-0 z-10 border-b border-gray-100">
                                    <button
                                        onClick={goBack}
                                        className="rounded-full p-2 hover:bg-white mr-2 transition-all"
                                    >
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <path
                                                d="M15 19L8 12L15 5"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>
                                    <h2 className="text-xl font-sign">
                                        {navbarData[selectedGroup].name}
                                    </h2>
                                </div>

                                <div className="p-4 space-y-4">
                                    <motion.a
                                        href={`/categoryNews?category_id=${navbarData[selectedGroup].id}&group_id=${navbarData[selectedGroup].id}`}
                                        className="block relative overflow-hidden rounded-xl shadow-sm"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        <div className="relative">
                                            <ImageWithFallback
                                                src={
                                                    navbarData[selectedGroup]
                                                        .image
                                                }
                                                className={imgStyle}
                                                alt={
                                                    navbarData[selectedGroup]
                                                        .name
                                                }
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/70 rounded-lg"></div>
                                            <div className="absolute bottom-0 left-0 right-0 p-4 text-white font-medium">
                                                <div className="font-sign text-lg">
                                                    {
                                                        navbarData[
                                                            selectedGroup
                                                        ].name
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </motion.a>

                                    {/* Категории */}
                                    {navbarData[selectedGroup].categories
                                        ?.length ? (
                                        <div className="space-y-3 mt-2">
                                            {navbarData[
                                                selectedGroup
                                            ].categories.map(
                                                (
                                                    category: CategoryType,
                                                    idx: number
                                                ) => (
                                                    <motion.div
                                                        key={category.id}
                                                        initial={{
                                                            opacity: 0,
                                                            y: 10,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            y: 0,
                                                        }}
                                                        transition={{
                                                            delay:
                                                                0.2 +
                                                                idx * 0.05,
                                                        }}
                                                    >
                                                        <a
                                                            href={`/categoryNews/${navbarData[selectedGroup].slug}/${category.slug}?category_id=${category.id}&group_id=${navbarData[selectedGroup].id}`}
                                                            className="block p-4 bg-white rounded-xl border border-[#e0e7ff] shadow-sm hover:border-[#c7d2fe] transition-all"
                                                        >
                                                            <span className="text-base font-medium text-[#223065] block mb-1">
                                                                {category.name}
                                                            </span>
                                                            <span className="text-sm text-gray-600 block">
                                                                {parseHtmlToReact(
                                                                    category.description
                                                                )}
                                                            </span>
                                                        </a>
                                                    </motion.div>
                                                )
                                            )}
                                        </div>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className="p-4 text-gray-500 italic bg-white rounded-xl border border-gray-100"
                                        >
                                            Нет категорий для отображения
                                        </motion.div>
                                    )}

                                    {/* Дополнительные ссылки */}
                                    {navbarData[selectedGroup].links?.length ? (
                                        <div className="mt-6 space-y-3">
                                            <h3 className="text-lg text-[#223065] font-medium px-1">
                                                Ссылки
                                            </h3>
                                            {navbarData[
                                                selectedGroup
                                            ].links.map((link, idx) => (
                                                <motion.div
                                                    key={link.name}
                                                    initial={{
                                                        opacity: 0,
                                                        y: 10,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    transition={{
                                                        delay: 0.3 + idx * 0.05,
                                                    }}
                                                    className="p-4 bg-white rounded-xl border border-[#e0e7ff] shadow-sm"
                                                >
                                                    <div className="font-medium text-[#223065] mb-1">
                                                        {link.name}
                                                    </div>
                                                    <p className="text-sm text-gray-700">
                                                        {link.description}
                                                    </p>
                                                </motion.div>
                                            ))}
                                        </div>
                                    ) : null}
                                </div>
                            </motion.div>
                        )}
                </AnimatePresence>
            </motion.div>
        </AnimatePresence>
    )
}
