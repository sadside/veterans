import { GradientBox } from '@/shared/ui/box/gradient-box'
import { IntroductionHat } from './IntroductionHat'
import { VeteranMemorial } from './VeteranMemorial'
import { Birthday } from '@/widgets/birthday'
import type { BirthdayType } from '@/shared/types/birtdayTypes'
type Props = {
    birthdayData: BirthdayType[]
}

export const Introduction = ({ birthdayData }: Props) => {
    return (
        <>
            <IntroductionHat />
            {birthdayData.length !== 0 && (
                <Birthday birthdayData={birthdayData} />
            )}

            <GradientBox className="h-[2px] w-full mb-[80px] mt-10" />

            <div className="rounded-lg overflow-hidden mb-[80px] ">
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
