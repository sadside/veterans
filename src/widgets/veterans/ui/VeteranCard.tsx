import React from 'react'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { Calendar, Award, User } from 'lucide-react'
import type { Veteran } from '@/shared/api/fetchVeterans'
import { ImageWithFallback } from '@/shared/ui/ImageWithFallback'

interface VeteranCardProps {
    veteran: Veteran
}

export const VeteranCard: React.FC<VeteranCardProps> = ({ veteran }) => {
    // Форматирование даты рождения
    const formatBirthday = (dateString: string) => {
        if (dateString === null) {
            return 'Дата не указана'
        }

        try {
            const date = new Date(dateString)
            return format(date, 'dd MMMM yyyy', { locale: ru })
        } catch (error) {
            return 'Дата не указана'
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col h-full">
            <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
                <ImageWithFallback
                    src={veteran.image}
                    alt={veteran.full_name}
                    className="w-full h-full object-cover"
                    fallbackClassName="w-full h-full bg-blue-50 flex items-center justify-center"
                    iconClassName="w-16 h-16 text-blue-200"
                />
                {veteran.is_vov_veteran && (
                    <div className="absolute top-3 right-3 bg-blue-600 text-white py-1 px-3 rounded-full text-xs font-medium flex items-center">
                        <Award className="w-3 h-3 mr-1" />
                        Ветеран ВОВ
                    </div>
                )}
            </div>

            <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {veteran.full_name}
                </h3>

                <div className="flex items-center text-sm text-gray-600 mb-2">
                    <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                    <span>{formatBirthday(veteran.birthday)}</span>
                </div>

                {/* <div className="mt-auto pt-4">
                    <a
                        href={`/veterans/details/${veteran.id}`}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                    >
                        Подробнее
                        <svg
                            className="w-4 h-4 ml-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </a>
                </div> */}
            </div>
        </div>
    )
}
