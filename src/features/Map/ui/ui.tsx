import type { MemorialTypes } from '@/shared/types/memorialsTypes'
import { useMapLogic } from '../model/MapModel'
import { useEffect } from 'react'

type MapProps = {
    memorialsData: MemorialTypes[]
    selectedMemorial?: MemorialTypes | null
}

export const Map = ({ memorialsData, selectedMemorial }: MapProps) => {
    const { mapRef, mapInstance } = useMapLogic(memorialsData)
    useEffect(() => {
        if (selectedMemorial && mapInstance) {
            mapInstance.setCenter(
                [selectedMemorial.latitude, selectedMemorial.longitude],
                15
            )
        }
    }, [selectedMemorial, mapInstance])

    return (
        <div
            ref={mapRef}
            className="h-[300px] sm:h-[400px] lg:h-[533px] w-full rounded-lg overflow-hidden"
        />
    )
}
