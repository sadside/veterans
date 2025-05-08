import type { GroupType } from '@/shared/types/groupTypes'
import Logo from '@/components/ui/logo'
import Prosecution from '@/components/ui/prosecution'

type Props = {
    toggleMobileMenu: () => void
    isMobileMenuOpen: boolean
    navbarData: GroupType[]
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
                <Logo />
                {/* <Prosecution /> */}
            </div>
        </div>
    </div>
)
