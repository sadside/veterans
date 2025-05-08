import React from 'react'
import { cn } from '@/lib/utils.ts'

interface MarqueeProps {
    direction?: 'left' | 'right'
    speed?: number
    className?: string
}

const Marquee = ({
    direction = 'left',
    speed = 10,
    className = '',
}: MarqueeProps) => {
    const animationClass =
        direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'

    return (
        <div
            className={cn(
                'overflow-hidden whitespace-nowrap bg-[#1570EF] text-white',
                className
            )}
            id="managment"
        >
            <div
                className={cn(
                    'inline-flex whitespace-nowrap gap-20',
                    animationClass
                )}
                style={{ animationDuration: `${speed}s` }}
            >
                {/* Основное содержимое */}
                <div className="flex gap-20 text-2xl font-semibold uppercase">
                    {Array.from({ length: 2 }).map((_, index) => (
                        <React.Fragment key={index}>
                            <div>Благодарность</div>
                            <div>Доблесть</div>
                            <div>Героизм</div>
                            <div>Единство</div>
                            <div>Память</div>
                        </React.Fragment>
                    ))}
                </div>
                {/* Дублированное содержимое для бесшовного эффекта */}
                <div className="flex gap-20 text-2xl font-semibold uppercase">
                    {Array.from({ length: 2 }).map((_, index) => (
                        <React.Fragment key={index}>
                            <div>Благодарность</div>
                            <div>Доблесть</div>
                            <div>Героизм</div>
                            <div>Единство</div>
                            <div>Память</div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Marquee
