type Props = {
    name: string
    surname: string
    patronymic: string
    image: string
}

export const BirthdayMobile = ({ name, surname, patronymic, image }: Props) => {
    return (
        <div
            className="relative flex flex-col items-center gap-6 p-4 bg-cover bg-center h-auto"
            style={{
                backgroundImage: `url(/birhdayBg.png)`,
            }}
        >
            {/* Верхняя часть — изображение */}
            <div className="relative flex flex-col items-center gap-4 w-full">
                <img
                    src={image}
                    loading="lazy"
                    alt={`${name} ${surname}`}
                    className="w-[250px] h-auto object-contain"
                />
            </div>
            {/* Нижняя часть — текст */}
            <div className="flex flex-col text-white text-center max-w-full space-y-4">
                <h3 className="text-3xl font-sign">
                    Уважаемый(-ая) {surname} {name.toUpperCase()} <br />
                    {patronymic.toUpperCase()}.
                </h3>
                <h2 className="text-4xl font-pacif leading-tight">
                    С ДНЁМ <br /> РОЖДЕНИЯ!
                </h2>
                <p className="text-2xl font-sign">
                    Поздравляем Вас с самыми лучшими пожеланиями
                </p>
            </div>
            {/* Лента, закрепленная в левом нижнем углу */}
            {/* <img
                src={birthdayRibbon.src}
                loading="lazy"
                alt="Лента"
                className="absolute left-0 bottom-0 w-[180px] h-auto object-contain "
            /> */}
        </div>
    )
}
