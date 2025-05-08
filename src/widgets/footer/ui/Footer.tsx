import Logo from '@/components/ui/logo'

export const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-[#223065] to-[#3E3838] text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center justify-center">
                    {/* Логотип и название организации */}
                    <div className="flex flex-col md:flex-row items-center">
                        <Logo className="h-32 w-32" />
                        <div className="md:ml-6 mt-4 md:mt-0">
                            <p className="font-inter text-xl text-center md:text-left font-medium">
                                НРО ООО ветеранов и пенсионеров
                            </p>
                            <p className="font-inter text-xl text-center md:text-left">
                                органы прокуратуры
                            </p>
                        </div>
                    </div>

                    {/* Разделительная линия */}
                    <div className="w-full md:w-2/3 mx-auto mt-8">
                        <div className="border-b border-gray-400 opacity-50" />
                    </div>

                    {/* Копирайт */}
                    <p className="mt-6 text-sm text-gray-300">
                        © {new Date().getFullYear()} Новосибирское региональное
                        отделение общероссийской общественной организации
                        ветеранов и органов прокуратуры
                    </p>
                </div>
            </div>
        </footer>
    )
}
