import Logo from '@/components/ui/logo'

export const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-[#223065] to-[#3E3838] text-white p-6 md:p-10">
            {/* Логотип и документы */}
            <div className="flex flex-col md:flex-row justify-between items-center mx-auto 2xl:max-w-6xl xl:max-w-5xl">
                {/* Логотип и текст */}
                <div className="flex flex-col md:flex-row items-center md:items-start">
                    <Logo className="h-32 w-32" />
                    <p className="md:pt-12 font-inter md:ml-4 text-lg text-center md:text-left">
                        НРО ООО ветеранов и пенсионеров <br /> органы
                        прокуратуры
                    </p>
                </div>

                {/* Навигация с документами в правой части */}
                <nav className="grid grid-cols-2 md:grid-cols-2 md:grid xl:flex 2xl:flex gap-4 2xl:gap-16 md:gap-10 md:pr-10 xl:pr-0 2xl:pr-0 pt-8 md:pt-0 text-center md:text-left">
                    <a
                        href="/documents"
                        className="text-lg text-white border-b border-gray-400 hover:no-underline"
                    >
                        Документы
                    </a>
                    {/* <a
                        href="/institutions"
                        className="text-lg text-white border-b border-gray-400 pb-1 hover:no-underline"
                    >
                        Учреждения
                    </a>
                    <a
                        href="/reports"
                        className="text-lg text-white border-b border-gray-400 pb-1 hover:no-underline"
                    >
                        Отчеты
                    </a>
                    <a className="text-lg text-white border-b border-gray-400 pb-1 hover:no-underline">
                        Реквизиты
                    </a> */}
                </nav>
            </div>

            <div className="w-11/12 2xl:w-4/6 xl:w-5/6 mx-auto 2xl:pt-0 xl:pt-0 pt-10">
                <div className="border-b border-gray-400 mt-5" />
            </div>
        </footer>
    )
}
