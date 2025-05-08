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

const detailVariants = {
    initial: { opacity: 0, x: 40 },
    open: {
        opacity: 1,
        x: 0,
        transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
    closed: { opacity: 0, x: 40 },
}

// Универсальная иконка для пунктов меню
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

export const MobileMobileMenu = ({
    isMobileMenuOpen,
    navbarData,
}: {
    isMobileMenuOpen: boolean
    navbarData: GroupType[]
}) => {
    const [selectedGroup, setSelectedGroup] = useState<number | null>(null)

    const imgStyle = 'w-full h-[160px] object-cover rounded-lg'

    // Сброс выбранной группы при закрытии меню
    useEffect(() => {
        if (!isMobileMenuOpen) {
            const timeout = setTimeout(() => setSelectedGroup(null), 400)
            return () => clearTimeout(timeout)
        }
    }, [isMobileMenuOpen])

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
                <div className="flex flex-1 overflow-hidden">
                    {/* Левая колонка - меню категорий */}
                    <div className="w-[38%] overflow-y-auto flex flex-col bg-[#f8f9ff]">
                        <motion.a
                            href="/memorials"
                            className="flex items-start text-[21px] font-sign text-[#1f2b52] hover:text-[#1570EF] transition-all px-4 py-3.5 rounded-r-xl my-1 mx-1 hover:bg-white group"
                            variants={menuItemVariants}
                            initial="initial"
                            animate={isMobileMenuOpen ? 'open' : 'closed'}
                            custom={0}
                            whileHover={{ x: 3 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="mr-3 text-[#1f2b52] group-hover:text-[#1570EF] transition-all mt-1">
                                <MenuIcon />
                            </div>
                            <span className="leading-tight">Мемориалы</span>
                        </motion.a>
                        {/* <motion.a
                            href="/documents"
                            className="flex items-start text-[21px] font-sign text-[#1f2b52] hover:text-[#1570EF] transition-all px-4 py-3.5 rounded-r-xl my-1 mx-1 hover:bg-white group"
                            variants={menuItemVariants}
                            initial="initial"
                            animate={isMobileMenuOpen ? 'open' : 'closed'}
                            custom={1}
                            whileHover={{ x: 3 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="mr-3 text-[#1f2b52] group-hover:text-[#1570EF] transition-all mt-1">
                                <MenuIcon />
                            </div>
                            <span className="leading-tight">Документы</span>
                        </motion.a> */}

                        <motion.div
                            className="flex flex-col space-y-1 my-1 list-none"
                            initial="initial"
                            animate={isMobileMenuOpen ? 'open' : 'closed'}
                        >
                            {navbarData.map((group, index) => (
                                <motion.div
                                    key={index}
                                    onClick={() => setSelectedGroup(index)}
                                    className={`px-4 py-3.5 text-[21px] cursor-pointer group transition-all mx-1 rounded-r-xl ${
                                        selectedGroup === index
                                            ? 'bg-white text-[#1570EF] shadow-sm'
                                            : 'text-[#1f2b52] hover:bg-white'
                                    }`}
                                    variants={menuItemVariants}
                                    custom={index + 2}
                                    whileHover={{
                                        x: selectedGroup === index ? 0 : 3,
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="flex">
                                        <div className="mr-3 transition-all mt-1 flex-shrink-0">
                                            <MenuIcon
                                                active={selectedGroup === index}
                                            />
                                        </div>
                                        <div className="flex flex-1 justify-between items-start">
                                            <span className="font-sign leading-tight line-clamp-2 mr-5">
                                                {group.name}
                                            </span>
                                            <motion.div
                                                className={`flex-shrink-0 ml-1 ${
                                                    selectedGroup === index
                                                        ? 'text-[#1570EF]'
                                                        : 'text-[#1f2b52] group-hover:text-[#1570EF]'
                                                }`}
                                                animate={{
                                                    rotate:
                                                        selectedGroup === index
                                                            ? 90
                                                            : 0,
                                                }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                {selectedGroup === index
                                                    ? '−'
                                                    : '+'}
                                            </motion.div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Правая колонка – детали выбранной группы */}
                    <div className="w-[62%] p-4 overflow-y-auto">
                        <AnimatePresence mode="wait">
                            {selectedGroup !== null &&
                                navbarData[selectedGroup] && (
                                    <motion.div
                                        key={selectedGroup}
                                        variants={detailVariants}
                                        initial="initial"
                                        animate="open"
                                        exit="closed"
                                        transition={{ duration: 0.3 }}
                                        className="space-y-4"
                                    >
                                        {/* Заголовок выбранной группы */}
                                        <motion.h2
                                            className="text-[22px] font-sign text-[#223065] mb-4"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 }}
                                        >
                                            {navbarData[selectedGroup].name}
                                        </motion.h2>

                                        {/* Изображение с затемнением */}
                                        <motion.a
                                            href={`/categoryNews?category_id=${navbarData[selectedGroup].id}&group_id=${navbarData[selectedGroup].id}`}
                                            className="block mb-5 relative overflow-hidden rounded-xl shadow-sm"
                                            initial={{
                                                opacity: 0,
                                                scale: 0.95,
                                            }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.2 }}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <div className="relative">
                                                <ImageWithFallback
                                                    src={
                                                        navbarData[
                                                            selectedGroup
                                                        ].image
                                                    }
                                                    className={imgStyle}
                                                    alt={
                                                        navbarData[
                                                            selectedGroup
                                                        ].name
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
                                            <div className="space-y-2.5">
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
                                                                y: 15,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                                y: 0,
                                                            }}
                                                            transition={{
                                                                delay:
                                                                    0.3 +
                                                                    idx * 0.05,
                                                            }}
                                                        >
                                                            <a
                                                                href={`/categoryNews/${navbarData[selectedGroup].slug}/${category.slug}?category_id=${category.id}&group_id=${navbarData[selectedGroup].id}`}
                                                                className="block cursor-pointer bg-[#f8f9ff] hover:bg-white p-3.5 transition-all rounded-xl border border-[#e0e7ff] hover:border-[#c7d2fe] hover:shadow-sm"
                                                            >
                                                                <span className="text-base font-medium text-[#223065]">
                                                                    {
                                                                        category.name
                                                                    }
                                                                </span>
                                                                <span className="text-sm text-gray-600 block mt-1">
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
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.3 }}
                                                className="text-gray-500 italic p-3 rounded-xl bg-[#f8f9ff]"
                                            >
                                                Нет категорий для отображения
                                            </motion.div>
                                        )}

                                        {/* Дополнительные ссылки */}
                                        {navbarData[selectedGroup].links
                                            ?.length ? (
                                            <motion.div
                                                className="space-y-3 mt-4"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.4 }}
                                            >
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
                                                            delay:
                                                                0.5 + idx * 0.1,
                                                        }}
                                                        className="p-3.5 hover:bg-[#f8f9ff] rounded-xl transition-all"
                                                    >
                                                        <div className="font-medium text-[#223065]">
                                                            {link.name}
                                                        </div>
                                                        <p className="text-sm text-gray-700 mt-1">
                                                            {link.description}
                                                        </p>
                                                    </motion.div>
                                                ))}
                                            </motion.div>
                                        ) : null}
                                    </motion.div>
                                )}

                            {selectedGroup === null && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="h-full flex items-center justify-center p-5 text-center"
                                >
                                    <div className="text-gray-500">
                                        <svg
                                            className="w-12 h-12 mx-auto mb-4 text-[#223065]/30"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M15 19L8 12L15 5"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <p className="font-sign text-xl text-[#223065]">
                                            Выберите категорию для просмотра
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
