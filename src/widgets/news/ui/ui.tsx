import { useState } from 'react'
import { useIsDevice } from '@/widgets/navbar/model/useIsDevice'
import {
    Carousel,
    CarouselItem,
    useEmblaController,
} from '@/components/ui/carousel'
import type { NewsItem, NewsResponse } from '@/shared/api/fetchNewsFeed'
import { getImageUrl } from '@/shared/config/apiConfig'
import { ImageWithFallback } from '@/shared/ui/ImageWithFallback'
import { ArrowRight } from 'lucide-react'

// Запасной массив новостей для использования, если API не вернет данные
const fallbackNews = [
    {
        id: 1,
        image: '/assets/images/news/new1.jpg',
        title: 'В прокуратуре Новосибирской области прошла встреча со студентами юридического факультета РАНХиГС',
        content: '',
        published_at: '',
        category: { id: 0, name: '', group: { id: 0, name: '', slug: '' } },
    },
    {
        id: 2,
        image: '/assets/images/news/new2.jpg',
        title: 'В преддверии празднования Дня Победы старший прокурор отдела кадров Елена Выступова провела урок для учеников 9-10 классов школы 54, на котором рассказала о работе прокуратуры Новосибирской области во время Великой Отечественной войны.',
        content: '',
        published_at: '',
        category: { id: 0, name: '', group: { id: 0, name: '', slug: '' } },
    },
    {
        id: 3,
        image: '/assets/images/news/new5.jpg',
        title: 'Прокуратурой особое внимание уделяется государственно-патриотическому воспитанию молодого поколения и граждан нашей страны',
        content: '',
        published_at: '',
        category: { id: 0, name: '', group: { id: 0, name: '', slug: '' } },
    },
]

interface NewsProps {
    newsData?: NewsResponse
}

export const News = ({ newsData }: NewsProps) => {
    const device = useIsDevice()
    const initialCount = 3
    const [visibleCount, setVisibleCount] = useState(initialCount)

    // Используем данные из API, если они есть, иначе используем запасной массив
    const newsItems = newsData?.results?.length
        ? newsData.results
        : fallbackNews
    const newsToDisplay = newsItems.slice(0, visibleCount)

    const { emblaRef, selectedIndex, scrollTo } = useEmblaController()

    const handleShowMore = () => {
        setVisibleCount((prev) => prev + 6)
    }

    return (
        <div className="bg-white rounded-3xl p-4">
            <h2 className="text-2xl font-bold mb-5">Новости</h2>
            {device === 'mobile' ? (
                <div className="bg-white rounded-3xl flex">
                    <div className="flex-1">
                        <Carousel className="overflow-hidden" ref={emblaRef}>
                            <div className="flex">
                                {newsItems.map((item, idx) => (
                                    <CarouselItem
                                        key={item.id || idx}
                                        className="min-w-full flex-shrink-0 pr-4"
                                    >
                                        <New
                                            title={item.title}
                                            image={item.image}
                                            item={item}
                                        />
                                    </CarouselItem>
                                ))}
                            </div>
                        </Carousel>
                    </div>

                    <div className="flex flex-col justify-center ml-4 space-y-2">
                        {newsItems.map((_, index) => (
                            <button
                                key={index}
                                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                                    index === selectedIndex
                                        ? 'bg-blue-500 border-2 border-white'
                                        : 'bg-gray-300 border-2 border-gray-200'
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
                                key={item.id || idx}
                                title={item.title}
                                image={item.image}
                                item={item}
                            />
                        ))}
                    </div>
                    {visibleCount < newsItems.length && (
                        <button
                            onClick={handleShowMore}
                            className="mt-6 px-5 py-2 text-[#146CE7] bg-white hover:bg-[#146CE7] hover:text-white border border-[#146CE7] rounded-md transition-all hover:shadow-md flex items-center gap-2 font-medium mx-auto"
                        >
                            Смотреть ещё
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    )}
                </>
            )}
        </div>
    )
}

const New = ({
    title,
    image,
    item,
}: {
    title: string
    image: string
    item: NewsItem
}) => {
    const link = `/news/categoryNews/${item.category.group.slug}/${item.category.slug}/?news_id=${item.id}`

    return (
        <div className="relative h-full flex flex-col group">
            <div className="w-full h-[300px] overflow-hidden rounded-3xl">
                <ImageWithFallback
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    fallbackClassName="rounded-3xl w-full h-full"
                />
            </div>
            <div className="max-w-[calc(100%-24px)] absolute bottom-3 left-3 bg-[#1570EF] bg-opacity-80 rounded-2xl text-white p-3 shadow-md transition-all duration-300 group-hover:bg-opacity-95">
                <h2 className="text-[14px] font-bold mb-[6px] line-clamp-3">
                    {title}
                </h2>
                <div className="bg-white rounded-md px-2 py-1 inline-flex items-center gap-1 hover:bg-opacity-90 transition-all">
                    <a
                        href={link}
                        className="text-xs flex items-center gap-1 font-medium text-[#146CE7] cursor-pointer"
                    >
                        Читать подробнее
                        <ArrowRight className="w-3 h-3 text-[#146CE7]" />
                    </a>
                </div>
            </div>
        </div>
    )
}
