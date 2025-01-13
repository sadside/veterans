import arrow from '@/assets/icons/Right Down.svg'
import first from '@/assets/images/leisure/Veterans Prosecution Rectangle (1).png'
import second from '@/assets/images/leisure/Veterans Prosecution Rectangle (2).png'
import third from '@/assets/images/leisure/Veterans Prosecution Rectangle (3).png'
import fourth from '@/assets/images/leisure/Veterans Prosecution Rectangle (4).png'
import five from '@/assets/images/leisure/Veterans Prosecution Rectangle (5).png'
import six from '@/assets/images/leisure/Veterans Prosecution Rectangle (6).png'
import { Action } from '@/shared/ui/buttons/action'

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
    return (
        <div className="rounded-3xl px-16 py-[72px] bg-leisure-block-bg">
            <h2 className="text-white text-4xl font-medium uppercase">
                Наш Досуг
            </h2>
            <div className="flex justify-between gap-[100px] items-start">
                <img src={arrow.src} className="translate-x-[-20px]" />
                <div className="flex-1 grid grid-cols-3 grid-rows-2 gap-8 pb-6">
                    {data.map((item) => (
                        <Block
                            title={item.title}
                            image={item.image}
                            description={item.description}
                        />
                    ))}
                </div>
            </div>
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
            <h2 className="uppercase text-lg mb-5 font-medium h-[56px]">
                {title}
            </h2>
            <img src={image} className="mb-5" alt="" />
            <p className="text-[14px] text-[#858181] mb-3 flex-1">
                {description}
            </p>
            <Action
                className="text-[14px] bg-white border border-gray-500 text-black hover:bg-gray-100"
                as={'button'}
            >
                Подробнее
            </Action>
        </div>
    )
}
