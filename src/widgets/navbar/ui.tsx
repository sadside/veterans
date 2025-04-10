import { useState, useEffect } from 'react'
import MainLogo from '../../assets/icons/main-logo.png'
import prosecution from '../../assets/icons/prosecution.svg'
import { linkGroups } from './dictionary.ts'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu.tsx'
import { MobileVerticalMenu, NavbarMobile } from '../navbarMobile/index.ts'

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

type MenuLinksProps = {
    variant: 'tablet' | 'desktop'
}

const MenuLinks = ({ variant }: MenuLinksProps) => {
    // Параметры стилей зависят от варианта
    const contentPadding = variant === 'tablet' ? 'p-2' : 'p-4'
    const imgStyle =
        variant === 'tablet'
            ? 'h-[250px] rounded-sm max-w-[200px]'
            : 'h-[330px] rounded-sm max-w-[240px]'
    const linksContainerWidth = variant === 'tablet' ? 'w-[250px]' : 'w-[330px]'
    const textSize = variant === 'tablet' ? 'text-[12px]' : 'text-[14px]'

    return (
        <NavigationMenu>
            <NavigationMenuList className="h-full flex items-center gap-2">
                {linkGroups.map((group) => (
                    <NavigationMenuItem key={group.name}>
                        <NavigationMenuTrigger
                            className={`cursor-pointer font-semibold ${variant === 'tablet' ? 'text-[14px]' : 'text-[16px]'}`}
                            withArrow={!!group?.links}
                        >
                            {group.name}
                        </NavigationMenuTrigger>
                        {group?.links && (
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
                                        {group.links.map((link) => (
                                            <NavigationMenuLink
                                                key={link.name}
                                                className="block mb-1 cursor-pointer hover:bg-gray-100 px-2 pb-2 transition-all rounded-md"
                                            >
                                                <a
                                                    href={link.path}
                                                    className={`mb-1 font-semibold ${textSize}`}
                                                >
                                                    {link.name}
                                                </a>
                                                <p className="text-xs text-gray-600">
                                                    {link.description}
                                                </p>
                                            </NavigationMenuLink>
                                        ))}
                                    </div>
                                </div>
                            </NavigationMenuContent>
                        )}
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    )
}
export const Navbar = () => {
    const device = useIsDevice()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    if (device === 'mobile') {
        return (
            <>
                <NavbarMobile
                    toggleMobileMenu={() =>
                        setIsMobileMenuOpen((prev) => !prev)
                    }
                    isMobileMenuOpen={isMobileMenuOpen}
                />
                {/* Компонент всегда монтирован, а его анимация зависит от isMobileMenuOpen */}
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
                <MenuLinks
                    variant={device === 'tablet' ? 'tablet' : 'desktop'}
                />
                <Prosecution />
            </div>
        </div>
    )
}
