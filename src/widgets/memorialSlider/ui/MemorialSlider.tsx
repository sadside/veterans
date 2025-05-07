import React, { useState } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import { getImageUrl } from '@/shared/config/apiConfig'
import { ImageWithFallback } from '@/shared/ui/ImageWithFallback'

interface Photo {
    id: number
    image: string
    memorial: number
}

interface MemorialSliderProps {
    photos: Photo[]
    memorialName: string
}

export const MemorialSlider: React.FC<MemorialSliderProps> = ({
    photos,
    memorialName,
}) => {
    const [currentSlide, setCurrentSlide] = useState(0)

    if (!photos || photos.length === 0) {
        return (
            <div className="rounded-lg overflow-hidden bg-gray-200 h-[350px] flex items-center justify-center">
                <span className="text-gray-500 text-lg">
                    Изображения отсутствуют
                </span>
            </div>
        )
    }

    return (
        <div className="mt-6 mb-8">
            <div className="relative">
                <Carousel
                    opts={{ loop: true }}
                    className="w-full"
                    onSelect={(index) => {
                        if (typeof index === 'number') {
                            setCurrentSlide(index)
                        }
                    }}
                >
                    <CarouselContent>
                        {photos.map((photo, index) => (
                            <CarouselItem key={photo.id || index}>
                                <div className="rounded-lg overflow-hidden h-[350px] w-full">
                                    <ImageWithFallback
                                        src={photo.image}
                                        alt={`${memorialName} - фото ${index + 1}`}
                                        className="w-full h-full object-cover"
                                        loading={index === 0 ? 'eager' : 'lazy'}
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2 bg-white/80 hover:bg-white" />
                    <CarouselNext className="right-2 bg-white/80 hover:bg-white" />
                </Carousel>
            </div>
        </div>
    )
}
