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
import { ImageWithFallback } from '@/shared/ui/ImageWithFallback'
import { ArrowRight } from 'lucide-react'

const data = [
    {
        title: 'ЗАЩИТА ПРАВ ВЕТЕРАНОВ',
        description: 'Совет ветеранов. Документы. Новости.',
        image: third.src,
        link: '/categoryNews/novosti/zashita-prav-veteranov?category_id=5&group_id=2',
    },
    {
        title: 'ПРАВОВОЕ ПРОСВЕЩЕНИЕ',
        description:
            'Официальное распространение идей и правовых требований среди населения.',
        image: fourth.src,
        link: '/categoryNews/novosti/pravovoe-prosveshenie?category_id=4&group_id=2',
    },
    {
        title: 'ЗАЩИТА ПРАВ ДЕТЕЙ',
        description:
            'Защита прав ребенка – одна из важнейших задач государства.',
        image: five.src,
        link: '/categoryNews/novosti/zashita-prav-detej?category_id=6&group_id=2',
    },
]

export const Leisure = () => {
    const device = useIsDevice()

    const { emblaRef, selectedIndex, scrollTo } = useEmblaController()

    return (
        <div className="rounded-3xl px-6 md:px-10 py-10 md:py-16 bg-leisure-block-bg">
            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-medium uppercase mb-6 md:mb-10 text-center md:text-left">
                Полезная Информация
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
                                            link={item.link}
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
                                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                                    index === selectedIndex
                                        ? 'bg-white border-2 border-blue-500'
                                        : 'bg-blue-500 border-2 border-blue-500'
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
                                link={item.link}
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
    link,
}: {
    title: string
    image: string
    description: string
    link: string
}) => {
    return (
        <div className="rounded-lg p-5 bg-white flex flex-col shadow-md hover:shadow-lg transition-all duration-300">
            <h2 className="uppercase text-base sm:text-lg md:text-xl mb-3 font-semibold min-h-[48px] text-center xl:text-left break-words text-[#146CE7]">
                {title}
            </h2>
            <div className="overflow-hidden rounded-lg mb-4">
                <ImageWithFallback
                    src={image}
                    alt={title}
                    className="w-full h-auto rounded-lg max-w-full transition-transform duration-500 hover:scale-105"
                />
            </div>
            <p className="text-sm sm:text-base md:text-lg text-[#858181] mb-5 flex-1 text-center xl:text-left">
                {description}
            </p>
            <a href={link ?? '#'}>
                <Button className="text-[#146CE7] bg-white hover:bg-[#146CE7] hover:text-white border border-[#146CE7] rounded-md h-10 w-auto px-5 transition-all hover:shadow-md flex items-center gap-2 font-medium mx-auto xl:mx-0">
                    Подробнее
                    <ArrowRight className="w-4 h-4" />
                </Button>
            </a>
        </div>
    )
}
const BlockMobile = ({
    title,
    image,
    description,
    link,
}: {
    title: string
    image: string
    description: string
    link: string
}) => {
    return (
        <div className="relative w-full flex flex-col bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden min-h-[350px] p-5">
            <h2 className="text-[#146CE7] text-lg font-semibold mb-3">
                {title}
            </h2>
            <div className="rounded-lg overflow-hidden mb-4">
                <ImageWithFallback
                    src={image}
                    alt={title}
                    className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
                />
            </div>
            <p className="text-sm text-gray-700 flex-1 mb-5">{description}</p>
            <div className="flex justify-end mt-auto">
                <a href={link ?? '#'}>
                    <Button className="text-[#146CE7] bg-white hover:bg-[#146CE7] hover:text-white border border-[#146CE7] rounded-md h-10 w-auto px-5 transition-all hover:shadow-md flex items-center gap-2 font-medium">
                        Подробнее
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </a>
            </div>
        </div>
    )
}
