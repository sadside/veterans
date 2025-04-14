import arrow from '@/assets/icons/Right Down.svg'
import first from '@/assets/images/leisure/Veterans Prosecution Rectangle (1).png'
import second from '@/assets/images/leisure/Veterans Prosecution Rectangle (2).png'
import third from '@/assets/images/leisure/Veterans Prosecution Rectangle (3).png'
import fourth from '@/assets/images/leisure/Veterans Prosecution Rectangle (4).png'
import five from '@/assets/images/leisure/Veterans Prosecution Rectangle (5).png'
import six from '@/assets/images/leisure/Veterans Prosecution Rectangle (6).png'
import { Action } from '@/shared/ui/buttons/action'
import { useIsDevice } from '@/widgets/navbar/model/useIsDevice'
import {
    Carousel,
    CarouselItem,
    useEmblaController,
} from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'

const data = [
    {
        title: 'ПРОТИВОДЕЙСТВИЕ КОРРУПЦИИ',
        description:
            'Противодействие коррупции всегда было и является приоритетной задачей для органов прокуратуры.',
        image: first.src,
    },
    {
        title: 'СВОДНЫЙ ПЛАН ПРОВЕРОК',
        description: 'EPKHM/EPП Поиск KHM/Cводный план',
        image: second.src,
    },
    {
        title: 'ЗАЩИТА ПРАВ ВЕТЕРАНОВ',
        description:
            'Совет ветеранов. Документы. Новости. Нюрнбергский процесс',
        image: third.src,
    },
    {
        title: 'ПРАВОВОЕ ПРОСВЕЩЕНИЕ',
        description:
            'Официальное распространение идей и правовых требований среди населения.',
        image: fourth.src,
    },
    {
        title: 'ЗАЩИТА ПРАВ ДЕТЕЙ',
        description:
            'Защита прав ребенка – одна из важнейших задач государства.',
        image: five.src,
    },
    {
        title: 'СТАТИСТИЧЕСКИЕ ДАННЫЕ',
        description: 'Результаты деятельности органов прокуратуры',
        image: six.src,
    },
]

export const Leisure = () => {
    const device = useIsDevice()

    const { emblaRef, selectedIndex, scrollTo } = useEmblaController()

    return (
        <div className="rounded-3xl px-6 md:px-10 py-10 md:py-16 bg-leisure-block-bg">
            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-medium uppercase mb-6 md:mb-10 text-center md:text-left">
                Наш Досуг
            </h2>
            {device === 'mobile' ? (
                <div className="rounded-3xl flex flex-col ">
                    <div className="flex-1 w-full ">
                        <Carousel className="overflow-hidden" ref={emblaRef}>
                            <div className="flex gap-4 ">
                                {data.map((item, index) => (
                                    <CarouselItem
                                        key={index}
                                        className="min-w-full flex-shrink-0"
                                    >
                                        <BlockMobile
                                            title={item.title}
                                            image={item.image}
                                            description={item.description}
                                        />
                                    </CarouselItem>
                                ))}
                            </div>
                        </Carousel>
                    </div>

                    {/* Пагинация снизу */}
                    <div className="flex justify-center mt-4 space-x-2">
                        {data.map((_, index) => (
                            <button
                                key={index}
                                className={`w-3 h-3 rounded-full border-2 transition-colors duration-300 ${
                                    index === selectedIndex
                                        ? 'bg-white '
                                        : 'bg-blue-500 '
                                }`}
                                onClick={() => scrollTo(index)}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col xl:flex-row gap-6 xl:gap-[100px] items-start">
                    <img
                        src={arrow.src}
                        className="w-10 hidden xl:block xl:w-auto mb-6 xl:translate-x-[-20px] mx-auto xl:mx-0"
                        alt="Arrow"
                    />
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 pb-6">
                        {data.map((item) => (
                            <Block
                                key={item.title}
                                title={item.title}
                                image={item.image}
                                description={item.description}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
const Block = ({
    title,
    image,
    description,
}: {
    title: string
    image: string
    description: string
}) => {
    return (
        <div className="rounded-lg p-4 bg-white flex flex-col">
            <h2 className="uppercase text-base sm:text-lg md:text-xl mb-3 font-medium min-h-[48px] text-center xl:text-left break-words">
                {title}
            </h2>
            <img
                src={image}
                className="mb-4 w-full h-auto rounded-lg max-w-full"
                alt={title}
            />
            <p className="text-sm sm:text-base md:text-lg text-[#858181] mb-3 flex-1 text-center xl:text-left">
                {description}
            </p>
            <Action
                className="text-sm sm:text-base bg-white border border-gray-500 text-black hover:bg-gray-100 mx-auto xl:mx-0"
                as="button"
            >
                Подробнее
            </Action>
        </div>
    )
}
const BlockMobile = ({
    title,
    image,
    description,
}: {
    title: string
    image: string
    description: string
}) => {
    return (
        <div className="relative w-full flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden min-h-[350px]">
            <div className="p-4 flex flex-col gap-2 flex-1 min-h-[400px]">
                <p className="text-black text-lg font-semibold">{title}</p>
                <img
                    src={image}
                    alt={title}
                    className="rounded-3xl w-full h-48 object-cover"
                />
                <p className="text-sm text-gray-700 flex-1">{description}</p>
            </div>
            <Button className="mt-auto ml-44 mb-7 text-sm  rounded-full bg-white border border-black text-black hover:bg-gray-100 transition w-max  ">
                Подробнее
            </Button>
        </div>
    )
}
