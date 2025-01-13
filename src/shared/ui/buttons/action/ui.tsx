import React, {
    type ComponentPropsWithoutRef,
    type ElementType,
    type ReactNode,
} from 'react'
import { cn } from '@/lib/utils.ts'

type Props<T extends ElementType> = {
    as?: T
    children: ReactNode
} & ComponentPropsWithoutRef<T>

export const Action = <T extends ElementType = 'div'>({
    as,
    children,
    className,
    ...props
}: Props<T>) => {
    const Component = as || 'div'

    return (
        <Component
            {...props}
            className={cn(
                'bg-[#1570EF] px-7 py-3 rounded-xl font-bold text-white hover:bg-[#2587F0] transition-all',
                className
            )}
        >
            {children}
        </Component>
    )
}
