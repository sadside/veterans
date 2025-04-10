// src/shared/hooks/useIsDevice.ts
import { useState, useEffect } from 'react'

export const useIsDevice = (): 'mobile' | 'tablet' | 'desktop' => {
    const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop'>(
        'desktop'
    )

    useEffect(() => {
        const checkDevice = () => {
            const width = window.innerWidth
            if (width < 768) {
                setDevice('mobile')
            } else if (width <= 1024) {
                setDevice('tablet')
            } else {
                setDevice('desktop')
            }
        }

        checkDevice()
        window.addEventListener('resize', checkDevice)
        return () => window.removeEventListener('resize', checkDevice)
    }, [])

    return device
}
