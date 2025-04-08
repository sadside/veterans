import { Action } from '@/shared/ui/buttons/action'
import Banner from '../../../assets/images/banner.png'
import memory from '../../../assets/images/memory.png'

export const IntroductionHat = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 py-[80px] px-4 items-start">
            {/* Блок 1 */}
            <div className="p-4 border border-gray-200 rounded-xl flex flex-col justify-center min-h-[334px]">
                <h1 className="text-[32px] lg:text-[46px] mb-4 text-[#222A51] font-semibold uppercase">
                    От прошлого к будущему: <br />
                    верность закону
                </h1>
            </div>

            {/* Блок 2 */}
            <div className="p-4 border border-gray-200 rounded-xl flex flex-col justify-between ">
                <img
                    src={Banner.src}
                    alt="Баннер"
                    className="w-full h-[300px] object-cover rounded"
                />
            </div>

            {/* Блок 3 */}
            <div className="relative p-4 border border-gray-200 rounded-xl overflow-hidden flex flex-col justify-between min-h-[334px]">
                <div className="absolute inset-0">
                    <img
                        src={memory.src}
                        alt="Memory background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40" />
                </div>
                <div className="relative z-10 flex flex-col justify-center items-center flex-1">
                    <h2 className="text-3xl font-semibold text-white drop-shadow text-center">
                        Присоединяйся к нам!
                    </h2>
                </div>
                <div className="absolute bottom-7">
                    <Action as="button">Подробнее</Action>
                </div>
            </div>

            {/* Блок 4 */}
            <div className="p-4 border border-gray-200 rounded-xl flex flex-col min-h-[334px] bg-[#205094] justify-center">
                <p className="font-bold mb-2 leading-relaxed text-3xl p-4">
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
