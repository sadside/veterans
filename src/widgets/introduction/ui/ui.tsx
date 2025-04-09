import { GradientBox } from '@/shared/ui/box/gradient-box'
import { IntroductionHat } from './IntroductionHat'
import { VeteranMemorial } from './VeteranMemorial'

export const Introduction = () => {
    return (
        <>
            <IntroductionHat />
            <GradientBox className="h-[2px] w-full mb-[80px]" />

            <div className="rounded-lg overflow-hidden mb-[80px]">
                <iframe
                    width="100%"
                    height="600"
                    src="https://rutube.ru/play/embed/1aa3806c7f8715278dd993643dbeaaa4"
                    frameBorder="0"
                    allow="clipboard-write; autoplay"
                    webkitAllowFullScreen
                    mozallowfullscreen
                    allowFullScreen
                ></iframe>
            </div>
            <VeteranMemorial />
        </>
    )
}
