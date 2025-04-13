import { useState, useEffect, useRef } from 'react'
import type { MemorialTypes } from '@/shared/types/memorialsTypes'

export const useMapLogic = (memorialsData: MemorialTypes[]) => {
    const mapRef = useRef<HTMLDivElement>(null)

    const [mapInstance, setMapInstance] = useState<any>(null)

    useEffect(() => {
        const initMap = () => {
            const map = new window.ymaps.Map(mapRef.current, {
                center: [55.0084, 82.9357],
                zoom: 10,
                controls: ['zoomControl'],
            })

            setMapInstance(map)

            const geoObjects = memorialsData.map(
                (memorial) =>
                    new window.ymaps.Placemark(
                        [memorial.latitude, memorial.longitude],
                        {
                            balloonContent: `<strong>${memorial.name}</strong><br/>${memorial.address}`,
                        },
                        { preset: 'islands#blueDotIcon' }
                    )
            )

            map.geoObjects.add(
                new window.ymaps.GeoObjectCollection({}, geoObjects)
            )
        }

        if (typeof window !== 'undefined') {
            const script = document.createElement('script')
            script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU'
            script.onload = () => window.ymaps.ready(initMap)
            document.head.appendChild(script)
        }
    }, [memorialsData])

    const handleDetailsClick = (memorial: MemorialTypes) => {
        mapInstance?.setCenter([memorial.latitude, memorial.longitude], 15)
    }

    return { handleDetailsClick, mapRef }
}
