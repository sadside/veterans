import birthdayRibbon from '../../../assets/images/birthday/birthdayRibbon.png'

type Props = {
    name: string
    surname: string
    patronymic: string
    image: string
    device: 'mobile' | 'tablet' | 'desktop'
}

export const BirthdayDesktop = ({
    name,
    surname,
    patronymic,
    image,
    device,
}: Props) => {
    return (
        <div
            className={`relative flex items-center bg-cover bg-center  ${
                device === 'desktop'
                    ? 'lg:h-[700px] gap-24 p-8'
                    : device === 'tablet'
                      ? 'min-h-[600px] px-10'
                      : ''
            }`}
            style={{
                backgroundImage: `url(/birhdayBg.png)`,
            }}
        >
            {/* Левая часть — изображение */}
            <div className=" ml-12">
                <img
                    src={image}
                    loading="lazy"
                    alt={`${name} ${surname}`}
                    className={`${device === 'desktop' ? 'lg:min-w-[400px] lg:min-h-[500px]' : 'min-w-[250px] min-h-[350px]'}`}
                />
            </div>
            {/* Лента прикреплена к левому краю */}
            <img
                src={birthdayRibbon.src}
                loading="lazy"
                alt="Лента"
                className={`absolute bottom-0 left-0 ${device === 'tablet' && 'w-[300px]'}`}
            />
            {/* Правая часть — текст */}
            <div
                className={`text-white space-y-6 ${device === 'tablet' && 'flex flex-col text-white text-left max-w-[700px] space-y-12 pl-10'}`}
            >
                <h3
                    className={` font-sign text-center ${device === 'tablet' ? 'text-3xl' : 'text-5xl'}`}
                >
                    Уважаемый(-ая) {surname} {name.toUpperCase()} <br />
                    {patronymic.toUpperCase()}.
                </h3>
                <h2
                    className={` font-pacif text-center leading-tight ${device === 'tablet' ? 'text-4xl' : 'text-6xl'}`}
                >
                    С ДНЁМ <br /> РОЖДЕНИЯ!
                </h2>
                <p
                    className={`font-sign ${device === 'tablet' ? 'text-3xl' : 'text-4xl'} `}
                >
                    Поздравляем Вас с самыми лучшими пожеланиями
                </p>
            </div>
        </div>
    )
}
