import { Separator } from '@/components/ui/separator.tsx'

const data = [
    {
        memorialPlaque: 'Мемориальная доска Власову Владимиру Павловичу',
        address: 'Ядринцевская, д. 27',
    },
    {
        memorialPlaque: 'Мемориальная доска Силакову Ивану Кондратьевичу',
        address: 'р.п. Ордынское, проспект Ленина, д. 19',
    },
    {
        memorialPlaque: 'Мемориальная доска Сырикову Валерию Александровичу',
        address: 'р.п. Мошково, ул. Пушкина, д. 4а',
    },
    {
        memorialPlaque: 'Мемориальная доска Борисенко Владимиру Ильичу',
        address: 'г. Бердск, ул. Комсомольская, д. 2в',
    },
    {
        memorialPlaque: 'Мемориальная доска Сквер имени Екатерины Филимоновой',
        address: 'Серебряниковская',
    },
]
export const Map = () => {
    return (
        <div className="pb-11 mt-14 px-4 sm:px-6 lg:px-0">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-7 uppercase text-center md:text-left">
                Местонахождение точек доступа
            </h2>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Блок с адресами */}
                <div className="w-full lg:w-1/3 flex flex-col justify-between rounded-lg bg-leisure-block-bg py-4 px-5 gap-4 order-1 lg:order-none">
                    {data.map((address) => (
                        <Block
                            address={address.address}
                            name={address.memorialPlaque}
                            key={address.memorialPlaque}
                        />
                    ))}
                </div>

                {/* Карта */}
                <div className="w-full lg:w-2/3 rounded-lg overflow-hidden order-2 lg:order-none">
                    <iframe
                        src="https://yandex.ru/map-widget/v1/?um=constructor%3A8c845fd06d0c7a2c32a33cc0b719fa9ebb1930f88440ec521c06fa4349259f32&amp;source=constructor"
                        width="100%"
                        height="100%"
                        className="h-[300px] sm:h-[400px] lg:h-[533px]"
                        frameBorder="0"
                    ></iframe>
                </div>
            </div>
        </div>
    )
}

const Block = ({ name, address }: { address: string; name: string }) => {
    return (
        <>
            <div className="text-white">
                <h3 className="mb-2 text-base sm:text-lg md:text-xl font-semibold break-words">
                    {name}
                </h3>
                <p className="text-sm sm:text-base">{address}</p>
            </div>
            <Separator className="my-3" />
        </>
    )
}
