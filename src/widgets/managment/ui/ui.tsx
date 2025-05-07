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
        name: 'Н.Б. Гончарова',
        position: 'Секретарь совета ветеранов',
    },
    {
        name: 'Л.Ю. Басов',
        position: 'Член совета ветеранов',
    },
    {
        name: 'В.А. Ковтун',
        position: 'Член совета ветеранов',
    },
    {
        name: 'П.В. Макаренко',
        position: 'Член совета ветеранов',
    },
    {
        name: 'В.М. Васечко',
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
            name: 'Члены совета ветеранов',
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
                        <div className="flex-1 w-full md:w-1/2">
                            <img
                                src={main.src}
                                className="mb-5 w-full h-auto"
                                alt=""
                            />
                            <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-2 gap-x-6 gap-y-1">
                                {members.map((member, index) => (
                                    <div key={index} className="text-center">
                                        <h3 className="font-semibold mb-1 text-sm md:text-base">
                                            {member.name}
                                        </h3>
                                        <p className="text-[14px] text-[#858181]">
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
                                                <div className="text-center">
                                                    <img
                                                        src={item.image}
                                                        alt=""
                                                        className="mb-5 w-full h-auto"
                                                    />
                                                    <h2 className="mb-5 font-semibold text-[16px]">
                                                        {item.name}
                                                    </h2>
                                                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 px-4">
                                                        {item.membersList.map(
                                                            (member, i) => (
                                                                <div key={i}>
                                                                    <h3 className="font-semibold text-sm">
                                                                        {
                                                                            member.name
                                                                        }
                                                                    </h3>
                                                                    <p className="text-[14px] text-[#858181]">
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
