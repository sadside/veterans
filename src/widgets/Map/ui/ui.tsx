import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator.tsx'
import type { MemorialTypes } from '@/shared/types/memorialsTypes'
import { useMapLogic } from '../model/MapModel'

type Props = {
    memorialsData: MemorialTypes[]
}

export const Map = ({ memorialsData }: Props) => {
    const { handleDetailsClick, mapRef } = useMapLogic(memorialsData)

    return (
        <div className="pb-11 mt-14 px-4 sm:px-6 lg:px-0">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-7 uppercase text-center md:text-left">
                Местонахождение точек доступа
            </h2>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Блок с адресами с прокруткой */}
                <div className="w-full lg:w-1/3 max-h-[533px] overflow-y-auto flex flex-col justify-start rounded-lg bg-leisure-block-bg py-4 px-5 gap-4 order-1 lg:order-none">
                    {memorialsData.map((memorial) => (
                        <Block
                            key={memorial.id}
                            name={memorial.name}
                            address={memorial.address}
                            onDetailsClick={() => handleDetailsClick(memorial)}
                        />
                    ))}
                </div>

                {/* Карта */}
                <div className="w-full lg:w-2/3 rounded-lg overflow-hidden order-2 lg:order-none">
                    <div
                        ref={mapRef}
                        className="h-[300px] sm:h-[400px] lg:h-[533px] w-full rounded-lg overflow-hidden"
                    />
                </div>
            </div>
        </div>
    )
}

const Block = ({
    name,
    address,
    onDetailsClick,
}: {
    name: string
    address: string
    onDetailsClick: () => void
}) => {
    return (
        <div className="text-white">
            <h3 className="mb-2 text-base sm:text-lg md:text-xl font-semibold break-words">
                {name}
            </h3>
            <p className="text-sm sm:text-base">{address}</p>
            <Button
                className="text-black bg-white rounded-full h-10 w-28 mt-5"
                onClick={onDetailsClick}
            >
                Подробнее
            </Button>
            <Separator className="my-3" />
        </div>
    )
}
