import { GradientBox } from '@/shared/ui/box/gradient-box'
import memory from '@/assets/images/memory.png'
import { Button } from '@/components/ui/button'
import { useIsDevice } from '@/widgets/navbar/model/useIsDevice'

export const Memory = () => {
    const device = useIsDevice()
    return (
        <div className="bg-white rounded-3xl p-6 md:p-10 flex flex-col lg:flex-row gap-10 font-montserrat">
            {device === 'mobile' ? (
                <>
                    {/* Текст */}
                    <div className="lg:order-1 w-full lg:w-1/2 ">
                        <div className="flex items-center">
                            <GradientBox className="h-1 w-full mb-5 md:mb-10 bg-tricolor-gradient" />
                            <h2 className="text-2xl sm:text-3xl font-semibold mb-5 uppercase text-center lg:text-left whitespace-nowrap ">
                                Память жива
                            </h2>
                            <GradientBox className="h-1 w-full mb-5 bg-tricolor-gradient rotate-180" />
                        </div>

                        <p className="indent-5 mb-5 font-light text-sm sm:text-base md:text-lg text-center lg:text-left">
                            04.10.2024 состоялось торжественное открытие сквера
                            имени участника Великой Отечественной войны,
                            прокурора Центрального района г. Новосибирска
                            Филимоновой Екатерины Дмитриевны.
                        </p>

                        <div className="w-full">
                            <img
                                src={memory.src}
                                alt="Memory Image"
                                className="w-full h-auto rounded-xl"
                            />
                        </div>

                        <p className="indent-5 font-light mb-8 pt-4">
                            В мероприятии приняли участие прокурор Новосибирской
                            области, и.о. начальника управления Генеральной
                            прокуратуры РФ по СФО Доржиев Баир Валерьевич, мэр
                            города Кудрявцев Максим Георгиевич, ветераны и
                            работники прокуратуры, родственники Екатерины
                            Дмитриевны.
                        </p>

                        <div className="flex justify-end">
                            <Button className="text-white bg-[#146CE7] hover:bg-white hover:text-[#146CE7] border border-[#146CE7] rounded-full h-10 w-auto px-4 transition-colors">
                                Подробнее
                            </Button>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="order-1 lg:order-2 w-full lg:w-1/2">
                        <img
                            src={memory.src}
                            alt="Memory Image"
                            className="w-full h-auto rounded-xl"
                        />
                    </div>

                    {/* Текст */}
                    <div className="order-2 lg:order-1 w-full lg:w-1/2">
                        <GradientBox className="h-1 w-full mb-5 md:mb-10 bg-tricolor-gradient" />
                        <h2 className="text-2xl sm:text-4xl font-semibold mb-5 uppercase text-center lg:text-left">
                            Память жива
                        </h2>

                        <p className="indent-5 mb-5 font-light text-sm sm:text-base md:text-lg text-center lg:text-left">
                            04.10.2024 состоялось торжественное открытие сквера
                            имени участника Великой Отечественной войны,
                            прокурора Центрального района г. Новосибирска
                            Филимоновой Екатерины Дмитриевны.
                        </p>
                        <p className="indent-5 font-light mb-8 text-sm sm:text-base md:text-lg text-center lg:text-left">
                            В мероприятии приняли участие прокурор Новосибирской
                            области, и.о. начальника управления Генеральной
                            прокуратуры РФ по СФО Доржиев Баир Валерьевич, мэр
                            города Кудрявцев Максим Георгиевич, ветераны и
                            работники прокуратуры, родственники Екатерины
                            Дмитриевны.
                        </p>
                        {device === 'tablet' ? (
                            <div className="flex justify-end">
                                <Button className="text-white bg-[#146CE7] hover:bg-white hover:text-[#146CE7] border border-[#146CE7] rounded-full h-10 w-auto px-4 transition-colors">
                                    Подробнее
                                </Button>
                            </div>
                        ) : (
                            <Button className="text-white bg-[#146CE7] hover:bg-white rounded-full h-10 w-auto px-4 flex items-center justify-center">
                                Подробнее
                            </Button>
                        )}
                    </div>
                </>
            )}
            {/* Картинка сверху на мобилках и планшетах */}
        </div>
    )
}
