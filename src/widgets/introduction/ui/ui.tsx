import { GradientBox } from '@/shared/ui/box/gradient-box'
import { IntroductionHat } from './IntroductionHat'
import { VeteranMemorial } from './VeteranMemorial'
import { Birthday } from '@/widgets/birthday'
import type { BirthdayType } from '@/shared/types/birtdayTypes'
import { useIsDevice } from '@/widgets/navbar/model/useIsDevice'
type Props = {
    birthdayData: BirthdayType[]
}

export const Introduction = ({ birthdayData }: Props) => {
    const device = useIsDevice()
    return (
        <>
            <IntroductionHat />
            {birthdayData.length !== 0 && (
                <Birthday birthdayData={birthdayData} />
            )}

            <GradientBox className="h-[2px] w-full mb-[80px] mt-10" />
            <h1 className="text-center font-bold text-xl md:text-3xl lg:text-3xl pb-5">
                Название видео
            </h1>
            <div className="rounded-lg overflow-hidden mb-[80px] ">
                <iframe
                    className="rounded-2xl"
                    width="100%"
                    height={device !== 'mobile' ? '600' : '250'}
                    src="https://rutube.ru/play/embed/1aa3806c7f8715278dd993643dbeaaa4"
                    frameBorder="0"
                    allow="clipboard-write; autoplay"
                    webkitAllowFullScreen
                    mozallowfullscreen
                    allowFullScreen
                ></iframe>
            </div>
            {/* <VeteranMemorial /> */}
        </>
    )
}
