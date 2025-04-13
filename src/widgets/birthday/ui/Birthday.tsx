import type { BirthdayType } from '@/shared/types/birtdayTypes'
import { useIsDevice } from '@/widgets/navbar/model/useIsDevice'
import { BirthdayMobile } from './BirthdayMobile'
import { BirthdayDesktop } from './BirthdayDesktop'
import w from '../../../assets/images/w.png'

type Props = {
    birthdayData: BirthdayType[]
}

const componentsMap = {
    mobile: BirthdayMobile,
    desktop: BirthdayDesktop,
}

export const Birthday = ({ birthdayData }: Props) => {
    const device = useIsDevice()
    const Component = componentsMap[device] || BirthdayDesktop

    const { name, surname, patronymic, image } = birthdayData[0]

    return (
        <Component
            name={name}
            surname={surname}
            patronymic={patronymic}
            image={image}
            device={device}
        />
    )
}
