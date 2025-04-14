import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator.tsx'
import type { MemorialTypes } from '@/shared/types/memorialsTypes'
import { Map } from '@/features/Map'
import { useState } from 'react'

type Props = {
    memorialsData: MemorialTypes[]
}

export const MemorialsOverview = ({ memorialsData }: Props) => {
    const [selectedMemorial, setSelectedMemorial] =
        useState<MemorialTypes | null>(null)

    return (
        <div className="pb-11 mt-14 px-4 sm:px-6 lg:px-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-7 uppercase text-center md:text-left">
                Местонахождение точек доступа
            </h2>

            <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-1/3 max-h-[533px] overflow-y-auto flex flex-col justify-start rounded-lg bg-gradient-to-b from-[#1670ED] to-[#0C4089] py-4 px-5 gap-4">
                    {memorialsData.map((memorial) => (
                        <Block
                            key={memorial.id}
                            name={memorial.name}
                            address={memorial.address}
                            onShowOnMapClick={() =>
                                setSelectedMemorial(memorial)
                            }
                            memorialId={memorial.id}
                        />
                    ))}
                </div>

                <div className="flex-1">
                    <Map
                        memorialsData={memorialsData}
                        selectedMemorial={selectedMemorial}
                    />
                </div>
            </div>
        </div>
    )
}

type BlockProps = {
    name: string
    address: string
    onShowOnMapClick: () => void
    memorialId: string | number
}

const Block = ({ name, address, onShowOnMapClick, memorialId }: BlockProps) => {
    return (
        <div className="text-white">
            <h3 className="mb-2 text-base sm:text-lg md:text-xl font-semibold break-words">
                {name}
            </h3>
            <p className="text-sm sm:text-base">{address}</p>

            <div className="flex gap-3 mt-5">
                <Button
                    className="text-black bg-white hover:bg-white rounded-full h-10 w-auto px-4"
                    onClick={onShowOnMapClick}
                >
                    Показать на карте
                </Button>
                <a href={`/memorials/${memorialId}`}>
                    <Button className="text-black bg-white hover:bg-white rounded-full h-10 w-auto px-4 flex items-center justify-center">
                        Перейти
                    </Button>
                </a>
            </div>

            <Separator className="my-3" />
        </div>
    )
}
