import { useState, useEffect } from 'react'

import { fetchGroups } from '@/shared/api/fetchGroups.ts'
import LoadingSpinner from '@/shared/ui/loadingSpinner/LoadingSpinner.tsx'
import type { GroupType } from '@/shared/types/groupTypes.ts'
import { MenuLinks } from './MenuLinks.tsx'
import Logo from '@/components/ui/logo.tsx'
import Prosecution from '@/components/ui/prosecution.tsx'
import { MobileMobileMenu, NavbarMobile } from '../navbarMobile/index.ts'
import { useIsDevice } from './model/useIsDevice.ts'

export const Navbar = () => {
    const device = useIsDevice()
    const [groups, setGroups] = useState<GroupType[]>([])
    const [loading, setLoading] = useState(true)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
                    groups={groups}
                />
                <MobileMobileMenu
                    isMobileMenuOpen={isMobileMenuOpen}
                    groups={groups}
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
