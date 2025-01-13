import React, { type ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils.ts'

export const GradientBox = ({
    className = '',
    children,
}: ComponentPropsWithoutRef<'div'>) => {
    return (
        <div className={cn('w-full h-full bg-custom-gradient', className)}>
            {children}
        </div>
    )
}

export default GradientBox
