import memory from '../../../assets/images/memory.png'

export const ImportantNews = () => {
    return (
        <div className="w-full flex justify-center pt-8 md:pt-16">
            <div className="w-[90%] sm:w-[85%] md:w-[80%] max-w-5xl relative overflow-hidden rounded shadow-md">
                {/* Адаптивная высота картинки, прямоугольная на мобилках */}
                <img
                    src={memory.src}
                    alt="Памятная доска"
                    className="
                        w-full 
                        h-[180px] 
                        sm:h-[220px] 
                        md:h-[280px] 
                        lg:h-[320px] 
                        object-cover
                    "
                />

                {/* Текст поверх изображения */}
                <div
                    className="
                        absolute
                        bottom-4
                        left-4
                        rounded-md
                        w-[calc(100%-2rem)]
                        bg-[#2359A8]/90
                        text-white
                        p-2
                        sm:p-4
                        md:p-6
                        lg:p-8
                    "
                >
                    <p
                        className="
                            text-xs
                            sm:text-sm
                            md:text-base
                            lg:text-lg
                            leading-snug
                            sm:leading-normal
                            md:leading-relaxed
                        "
                    >
                        Недавно в Новосибирской области произошло открытие
                        памятной доски, посвящённой почётному работнику
                        прокуратуры Власову Владимиру Павловичу
                    </p>
                </div>
            </div>
        </div>
    )
}
