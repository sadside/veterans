import birthdayRibbon from '../../../assets/images/birthday/birthdayRibbon.png'

type Props = {
    name: string
    surname: string
    patronymic: string
    image: string
}

export const BirthdayDesktop = ({
    name,
    surname,
    patronymic,
    image,
}: Props) => {
    return (
        <div
            className="relative flex flex-row items-center justify-start gap-32 p-8 bg-cover bg-center lg:h-[700px]"
            style={{
                backgroundImage: `url(/birhdayBg.png)`,
            }}
        >
            {/* Левая часть — изображение */}
            <div className="flex flex-col items-center gap-4 ml-12">
                <img
                    src={image}
                    loading="lazy"
                    alt={`${name} ${surname}`}
                    className="lg:min-w-[400px] lg:min-h-[500px] object-contain"
                />
            </div>
            {/* Лента прикреплена к левому краю */}
            <img
                src={birthdayRibbon.src}
                loading="lazy"
                alt="Лента"
                className="object-contain absolute pt-[280px] left-0"
            />
            {/* Правая часть — текст */}
            <div className="flex flex-col text-white text-left max-w-[800px] space-y-16">
                <h3 className="text-5xl font-sign">
                    Уважаемый(-ая) {surname} {name.toUpperCase()} <br />
                    {patronymic.toUpperCase()}.
                </h3>
                <h2 className="text-6xl font-pacif leading-tight">
                    С ДНЁМ <br /> РОЖДЕНИЯ!
                </h2>
                <p className="text-4xl font-sign">
                    Поздравляем Вас с самыми лучшими пожеланиями
                </p>
            </div>
        </div>
    )
}
