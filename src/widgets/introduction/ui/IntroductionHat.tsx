import { Action } from '@/shared/ui/buttons/action'
import memoryGridTwoHat from '../../../assets/images/memoryGridTwoHat.png'
import bgGridThreeHat from '../../../assets/images/Veteran.jpg'
import bgGridOneHat from '../../../assets/images/bgGridOneHat.png'
import { useIsDevice } from '@/widgets/navbar/model/useIsDevice'
import { GradientBox } from '@/shared/ui/box/gradient-box'
import { Button } from '@/components/ui/button'
export const IntroductionHat = () => {
    const device = useIsDevice()
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:py-[80px] px-4 items-start">
            {/* Блок 1 */}
            <div className="relative p-4 rounded-xl overflow-hidden flex flex-col justify-between min-h-[250px] lg:min-h-[350px] order-1">
                <div className="absolute inset-0">
                    {device !== 'mobile' && (
                        <img src={bgGridOneHat.src} alt="Баннер" />
                    )}
                    {device === 'mobile' && (
                        <GradientBox className="h-[2px] w-full mb-[80px] mt-10" />
                    )}
                </div>
                <div className="relative z-10 flex flex-col justify-center items-center flex-1">
                    <p
                        className={`text-4xl ${device === 'mobile' && 'text-center'} font-sign sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#101A9C] drop-shadow p-4 tracking-wider`}
                    >
                        От прошлого к будущему: верность закону
                    </p>
                </div>
                {device === 'mobile' && <GradientBox className="h-[2px]" />}
            </div>
            {/* Блок 4 (будет вторым на мобилке, последним на десктопе) */}
            <div
                className={`p-4 border border-gray-200 rounded-3xl flex flex-col ${device === 'tablet' && 'max-h-[220px] min-h-[200px]'} ${device !== 'tablet' && 'min-h-[250px]'} lg:min-h-[350px] bg-gradient-to-r from-[#2069D0] to-[#1A4893] justify-center order-3 md:order-4`}
            >
                <p
                    className={`font-bold mb-2 leading-relaxed ${device === 'tablet' ? 'text-lg' : 'sm:text-2xl lg:text-3xl'} px-4 lg:px-6`} // Уменьшены отступы, добавлены для мобильных устройств
                >
                    <span className="text-white">
                        Новосибирское региональное отделение
                    </span>{' '}
                    <span className="text-gray-300">
                        общероссийской общественной организации ветеранов и
                        органов прокуратуры
                    </span>
                </p>
            </div>

            {/* Блок 2 */}
            <div className="relative p-4 border border-gray-200 rounded-3xl lg:rounded-xl overflow-hidden flex flex-col justify-between min-h-[200px] lg:min-h-[350px] order-4 md:order-3">
                <div className="absolute inset-0">
                    <img
                        src={memoryGridTwoHat.src}
                        alt="Баннер"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Блок 3 */}
            <div className="relative p-4 border border-gray-200 rounded-3xl lg:rounded-xl overflow-hidden flex flex-col justify-between min-h-[200px] lg:min-h-[350px] order-4 md:order-3">
                <div className="absolute inset-0">
                    <img
                        src={bgGridThreeHat.src}
                        alt="Memory background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40" />
                </div>
                <div className="relative z-10 flex flex-col justify-center items-center flex-1">
                    <h2 className="text-xl sm:text-3xl lg:text-4xl font-semibold text-white drop-shadow text-center">
                        Присоединяйся к нам!
                    </h2>
                </div>

                <div className="absolute bottom-7 left-1/2 transform -translate-x-1/2 z-10">
                    <a
                        href="#managment"
                        className="inline-flex cursor-pointer items-center justify-center px-6 py-3 bg-[#185CBC] text-white font-medium rounded-lg transition-all duration-300 hover:bg-white hover:text-[#185CBC] focus:outline-none"
                        onClick={(e) => {
                            e.preventDefault()
                            const element = document.getElementById('managment')
                            if (element) {
                                element.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start',
                                })
                            }
                        }}
                    >
                        <span>Подробнее</span>
                        <svg
                            className="w-4 h-4 ml-2"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 5V19M12 19L5 12M12 19L19 12"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    )
}
