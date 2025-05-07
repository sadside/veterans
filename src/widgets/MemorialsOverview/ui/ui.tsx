import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator.tsx'
import type { MemorialTypes } from '@/shared/types/memorialsTypes'
import { Map } from '@/features/Map'
import { useState } from 'react'
import { ArrowRight, MapPin, Landmark } from 'lucide-react'

type Props = {
    memorialsData: MemorialTypes[]
}

export const MemorialsOverview = ({ memorialsData }: Props) => {
    const [selectedMemorial, setSelectedMemorial] =
        useState<MemorialTypes | null>(null)

    return (
        <div className="pb-11 mt-14 px-4 sm:px-6 lg:px-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-7 uppercase text-center md:text-left flex items-center justify-center md:justify-start gap-2">
                <Landmark
                    className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 text-[#1670ED]"
                    strokeWidth={1.5}
                />
                Местонахождение точек доступа
            </h2>

            <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-1/3 max-h-[533px] overflow-y-auto scrollbar-hide rounded-xl bg-gradient-to-b from-[#1670ED] to-[#0C4089] py-6 shadow-lg">
                    <div className="flex flex-col">
                        {memorialsData.map((memorial, index) => (
                            <div key={memorial.id} className="flex flex-col">
                                <Block
                                    name={memorial.name}
                                    address={memorial.address}
                                    onShowOnMapClick={() =>
                                        setSelectedMemorial(memorial)
                                    }
                                    memorialId={memorial.id}
                                />
                                {index !== memorialsData.length - 1 && (
                                    <div className="border-t border-dashed border-white/30 w-[90%] mx-auto my-3"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex-1 rounded-xl overflow-hidden shadow-lg">
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
        <div className="text-white hover:bg-white/10 py-4 px-6 transition-all rounded-lg">
            <h3 className="mb-2 text-base sm:text-lg md:text-xl font-semibold break-words">
                {name}
            </h3>
            <p className="text-sm sm:text-base text-white/80 flex items-start gap-2">
                <MapPin className="w-4 h-4 min-w-4 mt-1" />
                <span>{address}</span>
            </p>

            <div className="flex flex-wrap gap-3 mt-5">
                <Button
                    className="text-[#146CE7] bg-white hover:bg-white/90 rounded-md h-10 w-auto px-4 flex items-center gap-2 transition-all shadow-sm hover:shadow"
                    onClick={onShowOnMapClick}
                >
                    <MapPin className="w-4 h-4 text-[#146CE7]" />
                    Показать на карте
                </Button>
                <a href={`/memorials/${memorialId}`}>
                    <Button className="text-[#146CE7] bg-white hover:bg-white/90 rounded-md h-10 w-auto px-4 flex items-center gap-2 transition-all shadow-sm hover:shadow">
                        Перейти
                        <ArrowRight className="w-4 h-4 text-[#146CE7]" />
                    </Button>
                </a>
            </div>
        </div>
    )
}
