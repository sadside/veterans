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

export const Navbar = () => {
    return (
        <div className="fixed top-0 left-0 w-full bg-white z-20 flex justify-center items-center px-20 py-3 border-b border-b-gray-200">
            <div className="w-[1200px] flex justify-between">
                <Logo />
                <MenuLinks />
                <Prosecution />
            </div>
        </div>
    )
}

const Logo = () => {
    return (
        <img
            src={MainLogo.src}
            width={50}
            alt="Новосибирское региональное отделение Общероссийской общественной организации ветеранов и органов прокуратуры "
        />
    )
}

const MenuLinks = () => {
    return (
        <NavigationMenu>
            <NavigationMenuList className="h-full flex items-center gap-3">
                {linkGroups.map((group) => (
                    <NavigationMenuItem>
                        <NavigationMenuTrigger
                            className="cursor-pointer font-semibold text-[16px]"
                            withArrow={!!group?.links}
                        >
                            {group.name}
                        </NavigationMenuTrigger>
                        {group?.links && (
                            <NavigationMenuContent className="p-4">
                                <div className="flex gap-5">
                                    <div className="h-full shrink-0 relative">
                                        <img
                                            src={group.image}
                                            className="h-[330px] rounded-sm max-w-[240px]"
                                        />
                                        <div className="absolute top-0 left-0 bg-black opacity-50 size-full z-10 p-4"></div>
                                        <div className="absolute bottom-0 left-0 z-20 text-white px-2 pb-3">
                                            <h2 className="text-lg font-semibold mb-2">
                                                {group.title}
                                            </h2>
                                            <p className="text-[14px]">
                                                {group.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="w-[330px] shrink-0">
                                        <div className="">
                                            {group.links.map((link) => (
                                                <NavigationMenuLink
                                                    className={
                                                        'block mb-1 cursor-pointer hover:bg-gray-100 px-2 pb-2 transition-all rounded-md'
                                                    }
                                                >
                                                    <a
                                                        href=""
                                                        className="mb-1 text-[14px] font-semibold"
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
                                </div>
                            </NavigationMenuContent>
                        )}
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    )
}

const SubLinksPopover = () => {}

const Prosecution = () => {
    return (
        <img
            src={prosecution.src}
            width={40}
            className="cursor-pointer"
            alt=""
        />
    )
}
