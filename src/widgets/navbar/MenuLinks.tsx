import { useState } from 'react'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { parseHtmlToReact } from '@/shared/lib/parse-html'
import type { GroupType } from '@/shared/types/groupTypes'
import type { CategoryType } from '@/shared/types/categoryTypes'
import { ImageWithFallback } from '@/shared/ui/ImageWithFallback'

type MenuLinksProps = {
    variant: 'tablet' | 'desktop'
    navbarData: GroupType[]
}

// Обертка компонента ImageWithFallback с эффектом блюра
const ImageWithBlur = ({
    src,
    alt,
    className,
}: {
    src: string
    alt: string
    className: string
}) => {
    const [loading, setLoading] = useState(true)

    return (
        <div className={`relative ${className}`}>
            {loading && (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200 z-20">
                    {/* Можно добавить спиннер или placeholder */}
                </div>
            )}

            <ImageWithFallback
                src={src}
                alt={alt}
                className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-150 ${loading ? 'filter blur-md' : ''}`}
                onLoad={() => setLoading(false)}
                fallbackClassName="absolute top-0 left-0 w-full h-full"
            />
        </div>
    )
}

export const MenuLinks = ({ variant, navbarData }: MenuLinksProps) => {
    const contentPadding = variant === 'tablet' ? 'p-2' : 'p-4'
    // Фиксированные размеры изображения задаются здесь и передаются компоненту ImageWithBlur:
    const imgStyle =
        variant === 'tablet'
            ? 'w-[200px] h-[250px] rounded-sm'
            : 'w-[240px] h-[330px] rounded-sm'
    const linksContainerWidth = variant === 'tablet' ? 'w-[250px]' : 'w-[330px]'
    const textSize = variant === 'tablet' ? 'text-[12px]' : 'text-[14px]'

    // Изображение-заглушка для пункта "Ветераны"
    const veteransImage =
        'https://xn--80aahcr2amfksldt3a4k.xn--p1ai/novosti/archive2023/veteran.jpg'

    return (
        <NavigationMenu>
            <NavigationMenuList className="h-full flex items-center gap-2">
                <NavigationMenuItem>
                    <a
                        href="/memorials"
                        className="text-[25px]  font-sign  hover:text-[#1570EF] transition-colors"
                    >
                        Мемориалы
                    </a>
                </NavigationMenuItem>
                {/* <NavigationMenuItem>
                    <a
                        href="/documents"
                        className="text-[25px]  font-sign  hover:text-[#1570EF] transition-colors"
                    >
                        Документы
                    </a>
                </NavigationMenuItem> */}

                {/* Новый пункт меню "Ветераны" */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger
                        className={`cursor-pointer font-sign text-[25px]`}
                        withArrow={true}
                    >
                        Ветераны
                    </NavigationMenuTrigger>
                    <NavigationMenuContent
                        className={`${contentPadding} min-h-[350px] md:min-h-[250px]`}
                    >
                        <div className="flex gap-4 relative">
                            <div className="relative shrink-0">
                                <ImageWithBlur
                                    src={veteransImage}
                                    alt="Ветераны"
                                    className={imgStyle}
                                />
                                <div className="absolute top-0 left-0 bg-black opacity-50 w-full h-full z-10" />
                                <div className="absolute bottom-0 left-0 z-20 text-white px-2 pb-3">
                                    <h2 className="text-lg font-semibold mb-2">
                                        Ветераны
                                    </h2>
                                    <p className={textSize}>
                                        Информация о ветеранах Великой
                                        Отечественной войны и ветеранах
                                        прокуратуры
                                    </p>
                                </div>
                            </div>
                            <div className={linksContainerWidth}>
                                <NavigationMenuLink asChild>
                                    <a
                                        href="/veterans/ww2"
                                        className="block mb-1 cursor-pointer hover:bg-gray-100 px-2 pb-2 transition-all rounded-md"
                                    >
                                        <span className="text-sm font-bold">
                                            Ветераны Великой Отечественной войны
                                        </span>
                                        <span className="text-xs text-gray-600 block">
                                            Информация о ветеранах,
                                            участвовавших в Великой
                                            Отечественной войне, их подвигах и
                                            наградах
                                        </span>
                                    </a>
                                </NavigationMenuLink>

                                <NavigationMenuLink asChild>
                                    <a
                                        href="/veterans/prosecution"
                                        className="block mb-1 cursor-pointer hover:bg-gray-100 px-2 pb-2 transition-all rounded-md"
                                    >
                                        <span className="text-sm font-bold">
                                            Члены Совета Ветеранов Прокуратуры
                                            Новосибирской области
                                        </span>
                                        <span className="text-xs text-gray-600 block">
                                            Информация о ветеранах органов
                                            прокуратуры, их профессиональном
                                            пути и достижениях
                                        </span>
                                    </a>
                                </NavigationMenuLink>
                            </div>
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {navbarData.map((group) => (
                    <NavigationMenuItem key={group.id}>
                        <NavigationMenuTrigger
                            className={`cursor-pointer  font-sign ${
                                variant === 'tablet'
                                    ? 'text-[25px]'
                                    : 'text-[25px]'
                            }`}
                            withArrow={true}
                        >
                            {group.name}
                        </NavigationMenuTrigger>
                        {/* Фиксированная минимальная высота для содержимого */}
                        <NavigationMenuContent
                            className={`${contentPadding} min-h-[350px] md:min-h-[250px]`}
                        >
                            <div className="flex gap-4 relative">
                                <div className="relative shrink-0">
                                    <ImageWithBlur
                                        src={group.image}
                                        alt={group.title}
                                        className={imgStyle}
                                    />
                                    <div className="absolute top-0 left-0 bg-black opacity-50 w-full h-full z-10" />
                                    <div className="absolute bottom-0 left-0 z-20 text-white px-2 pb-3">
                                        <h2 className="text-lg font-semibold mb-2">
                                            {group.title}
                                        </h2>
                                        <p className={textSize}>
                                            {group.description}
                                        </p>
                                    </div>
                                </div>
                                <div className={linksContainerWidth}>
                                    {group.categories &&
                                    group.categories.length > 0 ? (
                                        group.categories.map(
                                            (category: CategoryType) => (
                                                <NavigationMenuLink
                                                    key={category.id}
                                                    asChild
                                                >
                                                    <a
                                                        href={`/categoryNews/${group.slug}/${category.slug}?category_id=${category.id}&group_id=${group.id}`}
                                                        className="block mb-1 cursor-pointer hover:bg-gray-100 px-2 pb-2 transition-all rounded-md"
                                                    >
                                                        <span className="text-sm font-bold">
                                                            {category.name}
                                                        </span>
                                                        <span className="text-xs text-gray-600 block">
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
