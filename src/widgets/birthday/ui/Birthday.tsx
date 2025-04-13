import type { BirthdayType } from '@/shared/types/birtdayTypes'
import { BirthdayTablet } from './BirthdayTablet'
import { useIsDevice } from '@/widgets/navbar/model/useIsDevice'
import w from '../../../assets/images/w.png'
import { BirthdayMobile } from './BirthdayMobile'
import { BirthdayDesktop } from './BirthdayDesktop'

type Props = {
    birthdayData: BirthdayType[]
}

export const Birthday = ({ birthdayData }: Props) => {
    const device = useIsDevice()

    const {
        name = 'Иван',
        surname = 'Иванов',
        patronymic = 'Иванович',
        image = w.src,
    } = birthdayData[0] || {}

    const birthdayInfo = { name, surname, patronymic, image }

    if (device === 'mobile') {
        return <BirthdayMobile {...birthdayInfo} />
    }

    if (device === 'tablet') {
        return <BirthdayTablet {...birthdayInfo} />
    }

    return <BirthdayDesktop {...birthdayInfo} />
}
