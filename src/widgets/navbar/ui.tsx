import { useState } from 'react'
import type { GroupType } from '@/shared/types/groupTypes.ts'
import { MenuLinks } from './MenuLinks.tsx'
import Logo from '@/components/ui/logo.tsx'
import Prosecution from '@/components/ui/prosecution.tsx'
import { useIsDevice } from './model/useIsDevice.ts'
import { MobileMobileMenu, NavbarMobile } from '../navbarMobile/index.ts'
type NavbarProps = {
    navbarData: GroupType[]
}
export const Navbar = ({ navbarData }: NavbarProps) => {
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
                    navbarData={navbarData}
                />
                <MobileMobileMenu
                    isMobileMenuOpen={isMobileMenuOpen}
                    navbarData={navbarData}
                />
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
                    navbarData={navbarData}
                />
                <div></div>
            </div>
        </div>
    )
}
