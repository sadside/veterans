import { useState } from 'react'
import new1 from '../../../assets/images/news/new1.jpg'
import new2 from '../../../assets/images/news/new2.jpg'
import new3 from '../../../assets/images/news/new3.jpg'
import new4 from '../../../assets/images/news/new4.jpeg'
import new5 from '@/assets/images/news/new5.jpg'
import { useIsDevice } from '@/widgets/navbar/model/useIsDevice'
import {
    Carousel,
    CarouselItem,
    useEmblaController,
} from '@/components/ui/carousel'

const news = [
    {
        image: new1.src,
        title: 'В прокуратуре Новосибирской области прошла встреча со студентами юридического факультета РАНХиГС',
    },
    {
        image: new2.src,
        title: 'В преддверии празднования Дня Победы старший прокурор отдела кадров Елена Выступова провела урок для учеников 9-10 классов школы 54, на котором рассказала о работе прокуратуры Новосибирской области во время Великой Отечественной войны.',
    },
    {
        image: new5.src,
        title: 'Прокуратурой особое внимание уделяется государственно-патриотическому воспитанию молодого поколения и граждан нашей страны',
    },
    {
        image: new3.src,
        title: 'В Новосибирской области состоялась торжественная церемония открытия мемориальной доски в честь бывшего прокурора Мошковского района Сырикова Валерия Александровича',
    },
    {
        image: new4.src,
        title: 'Прокуратура уделяет особое внимание патриотическому воспитанию молодых кадров и преемственности поколений',
    },
]

export const News = () => {
    const device = useIsDevice()
    const initialCount = 3
    const [visibleCount, setVisibleCount] = useState(initialCount)
    const newsToDisplay = news.slice(0, visibleCount)

    const { emblaRef, selectedIndex, scrollTo } = useEmblaController()

    const handleShowMore = () => {
        setVisibleCount((prev) => prev + 6)
    }

    return (
        <div className="bg-white rounded-3xl p-4">
            <h2 className="text-2xl font-bold mb-5">
                Новости ветеранского движения
            </h2>
            {device === 'mobile' ? (
                <div className="bg-white rounded-3xl  flex">
                    <div className="flex-1">
                        <Carousel className="overflow-hidden" ref={emblaRef}>
                            <div className="flex">
                                {news.map((item, idx) => (
                                    <CarouselItem
                                        key={idx}
                                        className="min-w-full flex-shrink-0 pr-4"
                                    >
                                        <New
                                            title={item.title}
                                            image={item.image}
                                        />
                                    </CarouselItem>
                                ))}
                            </div>
                        </Carousel>
                    </div>

                    <div className="flex flex-col justify-center ml-4 space-y-2">
                        {news.map((_, index) => (
                            <button
                                key={index}
                                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                                    index === selectedIndex
                                        ? 'bg-blue-500'
                                        : 'bg-gray-300'
                                }`}
                                onClick={() => scrollTo(index)}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-3 gap-4">
                        {newsToDisplay.map((item, idx) => (
                            <New
                                key={idx}
                                title={item.title}
                                image={item.image}
                            />
                        ))}
                    </div>
                    {visibleCount < news.length && (
                        <p
                            onClick={handleShowMore}
                            className="mt-4 px-4 py-2 text-black text-center rounded-md transition-colors cursor-pointer hover:underline"
                        >
                            Смотреть ещё
                        </p>
                    )}
                </>
            )}
        </div>
    )
}

const New = ({ title, image }: { title: string; image: string }) => {
    return (
        <div className="relative h-full flex flex-col">
            <img
                src={image}
                alt=""
                className="rounded-3xl w-full h-auto min-h-[300px] object-cover"
            />
            <div className="max-w-[calc(100%-24px)] absolute bottom-3 left-3 bg-[#1570EFB3] rounded-2xl text-white p-3">
                <h2 className="text-[14px] font-bold mb-[6px] line-clamp-3">
                    {title}
                </h2>
                <a className="text-xs">Читать подробнее</a>
            </div>
        </div>
    )
}
