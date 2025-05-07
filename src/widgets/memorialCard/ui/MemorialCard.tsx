import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import { ImageWithFallback } from '@/shared/ui/ImageWithFallback'

interface Photo {
    id: number
    image: string
    memorial: number
}

interface Memorial {
    id: number
    name: string
    description: string
    address?: string
    photos: Photo[]
}

interface MemorialCardProps {
    memorial: Memorial
}

export const MemorialCard: React.FC<MemorialCardProps> = ({ memorial }) => {
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="h-48 overflow-hidden">
                {memorial.photos && memorial.photos.length > 0 ? (
                    <Carousel opts={{ loop: true }} className="h-full">
                        <CarouselContent className="h-full">
                            {memorial.photos.map((photo, index) => (
                                <CarouselItem
                                    key={photo.id || index}
                                    className="h-full"
                                >
                                    <ImageWithFallback
                                        src={photo.image}
                                        alt={`${memorial.name} - фото ${index + 1}`}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        {memorial.photos.length > 1 && (
                            <>
                                <CarouselPrevious className="left-1 h-8 w-8 bg-white/70 hover:bg-white" />
                                <CarouselNext className="right-1 h-8 w-8 bg-white/70 hover:bg-white" />
                            </>
                        )}
                    </Carousel>
                ) : (
                    <div className="w-full h-full">
                        <ImageWithFallback
                            src=""
                            alt="Изображение отсутствует"
                            className="w-full h-full object-cover"
                            fallbackClassName="w-full h-full rounded-none"
                        />
                    </div>
                )}
            </div>
            <div className="p-6 flex flex-col h-full">
                <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1">
                    {memorial.name}
                </h2>
                <div
                    className="text-gray-600 line-clamp-3 mb-4"
                    dangerouslySetInnerHTML={{
                        __html: removeImagesFromHtml(
                            memorial.description || 'Описание отсутствует'
                        ),
                    }}
                />

                <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                        {memorial.address && (
                            <div className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 mr-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                                <span className="truncate max-w-[150px]">
                                    {memorial.address}
                                </span>
                            </div>
                        )}
                    </div>
                    <a
                        href={`/memorials/${memorial.id}`}
                        className="inline-flex items-center text-[#1570EF] font-medium text-sm"
                    >
                        <span>Подробнее</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    )
}

function removeImagesFromHtml(html: string | null | undefined): string {
    if (!html) return ''
    return html.replace(/<img[^>]*>/g, '')
}
