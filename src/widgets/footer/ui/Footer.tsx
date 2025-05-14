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

                    {/* Контактная информация */}
                    <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-6">
                        <a
                            href="mailto:ok@54.mailop.ru"
                            className="flex items-center text-gray-300 hover:text-white transition-colors"
                        >
                            <svg
                                className="w-5 h-5 mr-2"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M3 8L10.8906 13.2604C11.5624 13.7083 12.4376 13.7083 13.1094 13.2604L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <span className="text-base">ok@54.mailop.ru</span>
                        </a>
                        <a
                            href="tel:+73832230096"
                            className="flex items-center text-gray-300 hover:text-white transition-colors"
                        >
                            <svg
                                className="w-5 h-5 mr-2"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <span className="text-base">223-00-96</span>
                        </a>
                        <a
                            href="/documents"
                            className="flex items-center text-gray-300 hover:text-white transition-colors"
                        >
                            <svg
                                className="w-5 h-5 mr-2"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M19 16V3C19 1.89543 18.1046 1 17 1H7C5.89543 1 5 1.89543 5 3V21C5 22.1046 5.89543 23 7 23H17C18.1046 23 19 22.1046 19 21V20"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M9 7H15"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M9 11H15"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M9 15H13"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                            <span className="text-base">
                                Заявление на вступление в организацию
                            </span>
                        </a>
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
