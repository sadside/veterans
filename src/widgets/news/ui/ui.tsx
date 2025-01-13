import new1 from '../../../assets/images/news/new1.jpg'
import new2 from '../../../assets/images/news/new2.jpg'
import new3 from '../../../assets/images/news/new3.jpg'
import new4 from '../../../assets/images/news/new4.jpeg'
import new5 from '@/assets/images/news/new5.jpg'

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel.tsx'

const news = [
    {
        image: new1.src,
        title: 'В прокуратуре Новосибирской области прошла встреча со студентами юридического факультета РАНХиГС',
    },
    {
        image: new2.src,
        title: 'В преддверии празднования Дня Победы старший прокурор отдела кадров Елена Выступова провела урок для учеников 9-10 классов школы 54, на котором рассказала о работе прокуратуры Новосибирской области во время Великой Отечественной войны. ',
    },
    {
        image: new5.src,
        title: 'Прокуратурой особое внимание уделяется государственно-патриотическому воспитанию молодого поколения и граждан нашей страны',
    },
    {
        image: new3.src,
        title: 'В Новосибирской области состоялась торжественная церемония  открытия мемориальной доски в честь бывшего прокурора Мошковского района Сырикова Валерия Александровича',
    },
    {
        image: new4.src,
        title: 'Прокуратура уделяет особое внимание патриотическому воспитанию молодых кадров и преемственности поколений',
    },
]

export const News = () => {
    return (
        <div className="bg-white rounded-3xl p-4">
            <h2 className="text-2xl font-semibold mb-5">
                Новости ветеранского движения
            </h2>

            <Carousel opts={{ loop: true }} className="h-full]">
                <CarouselContent className="h-full">
                    {news.map((item) => (
                        <CarouselItem className="basis-1/3">
                            <New title={item.title} image={item.image} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-[-32px]" />
                <CarouselNext className="right-[-32px]" />
            </Carousel>
        </div>
    )
}

const New = ({ title, image }: { title: string; image: string }) => {
    return (
        <div className="relative h-full">
            <img src={image} alt="" className="rounded-3xl h-full" />
            <div className="max-w-[calc(100%-24px)] absolute bottom-3 left-3 bg-[#1570EFB3] rounded-2xl text-white p-3">
                <h2 className="text-[14px] font-bold mb-[6px] line-clamp-3">
                    {title}
                </h2>
                <a className="text-xs">Читать подробнее</a>
            </div>
        </div>
    )
}
