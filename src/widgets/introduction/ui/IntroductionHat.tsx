import { Action } from '@/shared/ui/buttons/action'
import memoryGridTwoHat from '../../../assets/images/memoryGridTwoHat.png'
import bgGridThreeHat from '../../../assets/images/bgGridThreeHat.png'
import bgGridOneHat from '../../../assets/images/bgGridOneHat.png'

export const IntroductionHat = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 py-[80px] px-4 items-start">
            {/* Блок 1 */}

            <div className="relative p-4  rounded-xl overflow-hidden flex flex-col justify-between min-h-[350px]">
                <div className="absolute inset-0">
                    <img src={bgGridOneHat.src} alt="Баннер" className="" />
                </div>
                <div className="relative z-10 flex flex-col justify-center items-center flex-1">
                    <p className="text-4xl font-sign sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#101A9C] drop-shadow p-4 tracking-wider">
                        От прошлого к будущему верность закону
                    </p>
                </div>
            </div>

            {/* Блок 2 */}
            <img
                src={memoryGridTwoHat.src}
                alt="Баннер"
                className="w-full h-full object-cover rounded-xl"
            />

            {/* Блок 3 */}
            <div className="relative p-4 border border-gray-200 rounded-xl overflow-hidden flex flex-col justify-between min-h-[350px]">
                <div className="absolute inset-0">
                    <img
                        src={bgGridThreeHat.src}
                        alt="Memory background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40" />
                </div>
                <div className="relative z-10 flex flex-col justify-center items-center flex-1">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white drop-shadow text-center">
                        Присоединяйся к нам!
                    </h2>
                </div>
                <div className="absolute bottom-7">
                    <Action as="button">Подробнее</Action>
                </div>
            </div>

            {/* Блок 4 */}
            <div className="p-4 border border-gray-200 rounded-xl flex flex-col min-h-[350px] bg-[#205094] justify-center">
                <p className="font-bold mb-2 leading-relaxed text-xl sm:text-2xl md:text-3xl p-4">
                    <span className="text-white">
                        Новосибирское региональное отделение
                    </span>{' '}
                    <span className="text-gray-300">
                        общероссийской общественной организации ветеранов и
                        органов прокуратуры
                    </span>
                </p>
            </div>
        </div>
    )
}
