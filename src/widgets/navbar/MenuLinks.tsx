import { useState } from 'react'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import LoadingSpinner from '@/shared/ui/loadingSpinner/LoadingSpinner'
import { parseHtmlToReact } from '@/shared/lib/parse-html'
import type { GroupType } from '@/shared/types/groupTypes'
import type { CategoryType } from '@/shared/types/categoryTypes'
import { loadCategoriesForGroup } from '@/shared/utils/loadCategoriesForGroup'

type MenuLinksProps = {
    variant: 'tablet' | 'desktop'
    navbarData: GroupType[]
}

export const MenuLinks = ({ variant, navbarData }: MenuLinksProps) => {
    const contentPadding = variant === 'tablet' ? 'p-2' : 'p-4'
    const imgStyle =
        variant === 'tablet'
            ? 'h-[250px] rounded-sm max-w-[200px]'
            : 'h-[330px] rounded-sm max-w-[240px]'
    const linksContainerWidth = variant === 'tablet' ? 'w-[250px]' : 'w-[330px]'
    const textSize = variant === 'tablet' ? 'text-[12px]' : 'text-[14px]'
    console.log(navbarData)
    return (
        <NavigationMenu>
            <NavigationMenuList className="h-full flex items-center gap-2">
                {navbarData.map((group) => (
                    <NavigationMenuItem key={group.id}>
                        <NavigationMenuTrigger
                            className={`cursor-pointer font-semibold ${
                                variant === 'tablet'
                                    ? 'text-[14px]'
                                    : 'text-[16px]'
                            }`}
                            withArrow={true}
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
                                                        href={`/categoryNews?category_id=${category.id}&group_id=${group.id}`}
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
