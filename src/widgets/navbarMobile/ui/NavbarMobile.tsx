// modules/navbar/components/NavbarMobile.tsx
import { useEffect, useState } from 'react'
import { linkGroups } from '@/widgets/navbar/dictionary'
import MainLogo from '../../../assets/icons/main-logo.png'
import prosecution from '../../../assets/icons/prosecution.svg'
import { motion } from 'framer-motion'

type Props = {
    toggleMobileMenu: () => void
    isMobileMenuOpen: boolean
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

export const NavbarMobile = ({ toggleMobileMenu, isMobileMenuOpen }: Props) => (
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
}: {
    isMobileMenuOpen: boolean
}) => {
    const [selectedGroup, setSelectedGroup] = useState<number | null>(null)

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
                {/* Левая колонка – список групп */}
                <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
                    <ul className="flex flex-col">
                        {linkGroups.map((group, index) => (
                            <li
                                key={index}
                                onClick={() => setSelectedGroup(index)}
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
                    {selectedGroup !== null && linkGroups[selectedGroup] && (
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
                            {linkGroups[selectedGroup].image && (
                                <div className="relative w-full h-[200px] sm:h-[250px] mb-6">
                                    <img
                                        src={linkGroups[selectedGroup].image}
                                        alt={
                                            linkGroups[selectedGroup].title ||
                                            ''
                                        }
                                        className="w-full h-full object-cover rounded-sm"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-3">
                                        <h2 className="text-lg font-semibold text-white">
                                            {linkGroups[selectedGroup].title ||
                                                linkGroups[selectedGroup].name}
                                        </h2>
                                        <p className="text-sm text-white">
                                            {linkGroups[selectedGroup]
                                                .description || ''}
                                        </p>
                                    </div>
                                </div>
                            )}
                            {linkGroups[selectedGroup].links?.length ? (
                                <div className="space-y-4">
                                    {linkGroups[selectedGroup].links.map(
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
                                <p className="text-sm text-gray-500">
                                    Дополнительных ссылок нет
                                </p>
                            )}
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    )
}
