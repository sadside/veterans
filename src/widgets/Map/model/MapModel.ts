import { useState, useEffect, useRef } from 'react'
import type { MemorialTypes } from '@/shared/types/memorialsTypes'

export const useMapLogic = (memorialsData: MemorialTypes[]) => {
    const mapRef = useRef<HTMLDivElement>(null)
    const [mapInstance, setMapInstance] = useState<any>(null)

    useEffect(() => {
        const initMap = () => {
            // @ts-ignore
            const map = new window.ymaps.Map(mapRef.current, {
                center: [55.0084, 82.9357], // Начальная позиция карты - Новосибирск
                zoom: 10,
                controls: ['zoomControl'],
            })

            // Сохраняем ссылку на экземпляр карты
            setMapInstance(map)

            // Добавляем метки на карту
            const geoObjects = memorialsData.map((memorial) => {
                // @ts-ignore
                return new window.ymaps.Placemark(
                    [memorial.latitude, memorial.longitude],
                    {
                        balloonContent: `<strong>${memorial.name}</strong><br/>${memorial.address}`,
                    },
                    {
                        preset: 'islands#blueDotIcon',
                    }
                )
            })

            // Добавляем все метки на карту
            // @ts-ignore
            map.geoObjects.add(
                new window.ymaps.GeoObjectCollection({}, geoObjects)
            )
            geoObjects.forEach((placemark) => map.geoObjects.add(placemark))
        }

        // Загрузка скрипта Яндекс.Карт
        if (typeof window !== 'undefined') {
            const script = document.createElement('script')
            script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU'
            script.type = 'text/javascript'
            script.onload = () => window.ymaps.ready(initMap)
            document.head.appendChild(script)
        }
    }, [memorialsData])

    const handleDetailsClick = (memorial: MemorialTypes) => {
        if (mapInstance) {
            // Перемещаем карту в нужную точку
            mapInstance.setCenter([memorial.latitude, memorial.longitude], 15)
        }
    }

    return { handleDetailsClick, mapRef }
}
