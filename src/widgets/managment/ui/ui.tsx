import one from '@/assets/images/managment/Veterans Prosecution Rectangle (7).png'
import trow from '@/assets/images/managment/Rectangle 1267 Veterans Prosecution.png'
import main from '@/assets/images/managment/Veterans Prosecutor.png'
import { useIsDevice } from '@/widgets/navbar/model/useIsDevice'
import {
    Carousel,
    CarouselItem,
    useEmblaController,
} from '@/components/ui/carousel'
import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ImageWithFallback } from '@/shared/ui/ImageWithFallback'

const data = [
    {
        name: 'Александр Алексеевич Громыко',
        image: one.src,
        description:
            'Председатель совета ветеранов Новосибирского регионального отделения ',
    },
    {
        name: 'Владимир Федорович Самочернов',
        image: trow.src,
        description:
            'Заместитель председателя совета ветеранов Новосибирского регионального отделения ',
    },
]

const members = [
    {
        name: 'Ковтун В.А.',
        position: 'Член совета ветеранов',
    },
    {
        name: 'Макаренко П.В.',
        position: 'Член совета ветеранов',
    },
    {
        name: 'Отдельных А.М.',
        position: 'Член совета ветеранов',
    },
    {
        name: 'Коваленко А.В.',
        position: 'Член совета ветеранов',
    },
    {
        name: 'Еремеева О.В.',
        position: 'Член совета ветеранов',
    },
    {
        name: 'Лобанова Ю.В.',
        position: 'Член совета ветеранов',
    },
    {
        name: 'Гановичев В.И.',
        position: 'Член совета ветеранов',
    },
]

type SimpleMember = {
    name: string
    image: string
    description: string
}

type MemberWithList = {
    name: string
    image: string
    description: string
    membersList: {
        name: string
        position: string
    }[]
}

type CombinedMember = SimpleMember | MemberWithList

export const Managment = () => {
    const device = useIsDevice()

    const { emblaRef, selectedIndex, scrollTo } = useEmblaController()
    // Объединяем data и members для мобильной версии
    const combinedData: CombinedMember[] = [
        ...data,
        {
            name: '',
            image: main.src,
            description: '',
            membersList: members,
        },
    ]

    return (
        <div>
            <h2 className="text-4xl font-semibold mb-14">Совет Ветеранов</h2>
            <div className="flex flex-col md:flex-row justify-between gap-8">
                {device !== 'mobile' ? (
                    <>
                        {data.map((item) => (
                            <MainBlock
                                key={item.name}
                                name={item.name}
                                image={item.image}
                                description={item.description}
                            />
                        ))}
                        <div className="flex-1 w-full md:w-1/2 flex flex-col justify-center">
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                                {members.map((member, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col items-center justify-center text-center bg-gray-50 border border-gray-100 rounded-2xl px-3 py-4 hover:shadow-md hover:border-blue-100 transition-all duration-200"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                                            <span className="text-blue-600 font-bold text-xs">
                                                {member.name.charAt(0)}
                                            </span>
                                        </div>
                                        <h3 className="font-semibold text-sm leading-tight">
                                            {member.name}
                                        </h3>
                                        <p className="text-[12px] text-[#858181] mt-1 leading-tight">
                                            {member.position}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="bg-white rounded-3xl">
                        <div className="flex-1">
                            <Carousel
                                className="overflow-hidden"
                                ref={emblaRef}
                            >
                                <div className="flex">
                                    {combinedData.map((item, idx) => (
                                        <CarouselItem
                                            key={idx}
                                            className="min-w-full flex-shrink-0 pr-4"
                                        >
                                            {'membersList' in item ? (
                                                <div className="px-2 pb-4">
                                                    <h2 className="mb-4 font-semibold text-[16px] text-center text-gray-700">
                                                        {item.name}
                                                    </h2>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        {item.membersList.map(
                                                            (member, i) => (
                                                                <div
                                                                    key={i}
                                                                    className="flex flex-col items-center text-center bg-gray-50 border border-gray-100 rounded-xl px-2 py-3"
                                                                >
                                                                    <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center mb-1">
                                                                        <span className="text-blue-600 font-bold text-xs">
                                                                            {member.name.charAt(
                                                                                0
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                    <h3 className="font-semibold text-xs leading-tight">
                                                                        {
                                                                            member.name
                                                                        }
                                                                    </h3>
                                                                    <p className="text-[11px] text-[#858181] mt-0.5 leading-tight">
                                                                        {
                                                                            member.position
                                                                        }
                                                                    </p>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            ) : (
                                                <MainBlock
                                                    name={item.name}
                                                    image={item.image}
                                                    description={
                                                        item.description
                                                    }
                                                />
                                            )}
                                        </CarouselItem>
                                    ))}
                                </div>
                            </Carousel>
                        </div>

                        <div className="flex flex-row justify-center ml-4 space-x-4">
                            {combinedData.map((_, index) => (
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
                )}
            </div>
        </div>
    )
}

const MainBlock = ({
    name,
    image,
    description,
}: {
    name: string
    image: string
    description: string
}) => {
    return (
        <div className="w-full md:w-1/4 mb-8 md:mb-0 text-center">
            <ImageWithFallback
                src={image}
                alt={name}
                className="mb-5 w-full h-auto"
            />
            <h2 className="mb-3 font-semibold text-[16px]">{name}</h2>
            <p className="text-[#858181] text-sm">{description}</p>
        </div>
    )
}
