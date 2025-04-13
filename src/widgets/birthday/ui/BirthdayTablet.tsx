import birthdayRibbon from '../../../assets/images/birthday/birthdayRibbon.png'

type Props = {
    name: string
    surname: string
    patronymic: string
    image: string
}

export const BirthdayTablet = ({ name, surname, patronymic, image }: Props) => {
    return (
        <div
            className="relative flex flex-row items-center justify-start px-10 py-8 bg-cover bg-center min-h-[600px] "
            style={{ backgroundImage: `url(/birhdayBg.png)` }}
        >
            <div className="flex flex-col items-center gap-4 ml-10">
                <img
                    src={image}
                    alt={`${name} ${surname}`}
                    className="min-w-[250px] min-h-[350px] object-contain"
                />
            </div>

            <img
                src={birthdayRibbon.src}
                alt="Лента"
                className="object-contain absolute left-0 bottom-0 w-[300px] "
            />

            <div className="flex flex-col text-white text-left max-w-[700px] space-y-10 pl-10">
                <h3 className="text-4xl font-sign">
                    Уважаемый(-ая) {surname} {name.toUpperCase()} <br />
                    {patronymic.toUpperCase()}.
                </h3>
                <h2 className="text-4xl font-pacif leading-tight">
                    С ДНЁМ <br /> РОЖДЕНИЯ!
                </h2>
                <p className="text-3xl font-sign">
                    Поздравляем Вас с самыми лучшими пожеланиями
                </p>
            </div>
        </div>
    )
}
