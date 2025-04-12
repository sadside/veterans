import React from 'react'
import MainLogo from '../../assets/icons/main-logo.png'
import { cn } from '@/lib/utils'

interface LogoProps {
    className?: string
}

const Logo: React.FC<LogoProps> = ({ className }) => (
    <a href="/" className={cn('inline-block', className)}>
        <img
            src={MainLogo.src}
            width={50}
            alt="Новосибирское региональное отделение ОО и органов прокуратуры"
            className={cn(className)}
        />
    </a>
)

export default Logo
