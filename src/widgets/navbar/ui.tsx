import { useState, useEffect } from 'react'
import axios from 'axios'
import MainLogo from '../../assets/icons/main-logo.png'
import prosecution from '../../assets/icons/prosecution.svg'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu.tsx'
import { MobileVerticalMenu, NavbarMobile } from '../navbarMobile/index.ts'
import { fetchGroups } from '@/shared/api/fetchGroups.ts'
import { fetchCategories } from '@/shared/api/fetchCategories.ts'
import { parseHtmlToReact } from '@/shared/lib/parse-html/parseHtmlToReact.ts'
import LoadingSpinner from '@/shared/ui/loadingSpinner/LoadingSpinner.tsx'

// Хук для определения типа устройства
const useIsDevice = () => {
    const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop'>(
        'desktop'
    )
    useEffect(() => {
        const checkDevice = () => {
            const width = window.innerWidth
            if (width < 768) setDevice('mobile')
            else if (width <= 1024) setDevice('tablet')
            else setDevice('desktop')
        }
        checkDevice()
        window.addEventListener('resize', checkDevice)
        return () => window.removeEventListener('resize', checkDevice)
    }, [])
    return device
}

const Logo = () => (
    <img
        src={MainLogo.src}
        width={50}
        alt="Новосибирское региональное отделение ОО и органов прокуратуры"
    />
)

const Prosecution = () => (
    <img
        src={prosecution.src}
        width={40}
        className="cursor-pointer"
        alt="360"
    />
)

// Типизация для ссылок и групп
type LinkType = {
    name: string
    description: string
    path: string
}

type GroupType = {
    id: number // добавлено для идентификации
    name: string
    title: string
    description: string
    image: string
    links?: LinkType[]
}

// Типизация для категории, добавляем поле path после нормализации
type CategoryType = {
    id: number
    name: string
    description: string
    slug: string
    created_at: string
    path: string
}

// Пропсы для компонента меню
type MenuLinksProps = {
    variant: 'tablet' | 'desktop'
    groups: GroupType[]
}

const MenuLinks = ({ variant, groups }: MenuLinksProps) => {
    const contentPadding = variant === 'tablet' ? 'p-2' : 'p-4'
    const imgStyle =
        variant === 'tablet'
            ? 'h-[250px] rounded-sm max-w-[200px]'
            : 'h-[330px] rounded-sm max-w-[240px]'
    const linksContainerWidth = variant === 'tablet' ? 'w-[250px]' : 'w-[330px]'
    const textSize = variant === 'tablet' ? 'text-[12px]' : 'text-[14px]'

    // Храним полученные категории для каждой группы (id группы — массив категорий)
    const [categoriesByGroup, setCategoriesByGroup] = useState<
        Record<number, CategoryType[]>
    >({})
    const [isLoadingCategories, setIsLoadingCategories] = useState<
        Record<number, boolean>
    >({})

    return (
        <NavigationMenu>
            <NavigationMenuList className="h-full flex items-center gap-2">
                {groups.map((group) => (
                    <NavigationMenuItem key={group.id}>
                        <NavigationMenuTrigger
                            className={`cursor-pointer font-semibold ${
                                variant === 'tablet'
                                    ? 'text-[14px]'
                                    : 'text-[16px]'
                            }`}
                            withArrow={true}
                            onMouseEnter={async () => {
                                // Если для данной группы категории ещё не загружены, выполняем запрос
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
                                        setCategoriesByGroup((prev) => ({
                                            ...prev,
                                            [group.id]: normalizedCategories,
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
                        >
                            {group.name}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className={contentPadding}>
                            <div className="flex gap-4">
                                <div className="relative shrink-0">
                                    <img
                                        src={group.image}
                                        className={imgStyle}
                                        alt={group.title}
                                    />
                                    <div className="absolute top-0 left-0 bg-black opacity-50 size-full z-10 p-4" />
                                    <div className="absolute bottom-0 left-0 z-20 text-white px-2 pb-3">
                                        <h2 className="text-lg font-semibold mb-2">
                                            {group.title}
                                        </h2>
                                        <p className={textSize}>
                                            {group.description}
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className={`${linksContainerWidth} shrink-0`}
                                >
                                    {/* Если для группы уже загружены категории, отображаем их */}
                                    {isLoadingCategories[group.id] ? (
                                        <div className="flex justify-center">
                                            <LoadingSpinner size="w-8 h-8" />
                                        </div>
                                    ) : categoriesByGroup[group.id] ? (
                                        categoriesByGroup[group.id].map(
                                            (category) => (
                                                <NavigationMenuLink
                                                    key={category.id}
                                                    asChild
                                                >
                                                    <a
                                                        href={`/categoryNews?category_id=${category.id}&group_id=${group.id}`}
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
                                                </NavigationMenuLink>
                                            )
                                        )
                                    ) : (
                                        <div>Нет категорий для отображения</div>
                                    )}
                                </div>
                            </div>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    )
}

export const Navbar = () => {
    const device = useIsDevice()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [groups, setGroups] = useState<GroupType[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const loadGroups = async () => {
            try {
                const groupsData = await fetchGroups()
                setGroups(groupsData)
            } catch (err: any) {
                console.error('Ошибка при запросе групп:', err)
                setError('Не удалось загрузить данные')
            } finally {
                setLoading(false)
            }
        }
        loadGroups()
    }, [])

    if (device === 'mobile') {
        return (
            <>
                <NavbarMobile
                    toggleMobileMenu={() =>
                        setIsMobileMenuOpen((prev) => !prev)
                    }
                    isMobileMenuOpen={isMobileMenuOpen}
                />
                <MobileVerticalMenu isMobileMenuOpen={isMobileMenuOpen} />
            </>
        )
    }

    const commonClasses =
        device === 'tablet'
            ? 'fixed top-0 left-0 w-full bg-white z-20 flex justify-between items-center px-10 py-3 border-b border-b-gray-200'
            : 'fixed top-0 left-0 w-full bg-white z-20 flex justify-center items-center px-20 py-3 border-b border-b-gray-200'
    const innerContainerClass =
        device === 'tablet'
            ? 'w-full flex justify-between items-center'
            : 'w-[1200px] flex justify-between'

    return (
        <div className={commonClasses}>
            <div className={innerContainerClass}>
                <Logo />
                {loading ? (
                    <LoadingSpinner size="w-10 h-10" />
                ) : error ? (
                    <div>{error}</div>
                ) : (
                    <MenuLinks
                        variant={device === 'tablet' ? 'tablet' : 'desktop'}
                        groups={groups}
                    />
                )}
                <Prosecution />
            </div>
        </div>
    )
}
