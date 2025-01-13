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
        <div className="pb-11 mt-14">
            <h2 className="text-2xl font-semibold mb-7 uppercase">
                Местонахождение точек доступа
            </h2>
            <div className="flex gap-3">
                <div className="w-1/3 flex flex-col justify-between rounded-lg bg-leisure-block-bg py-3 px-4">
                    {data.map((address) => (
                        <Block
                            address={address.address}
                            name={address.memorialPlaque}
                        />
                    ))}
                </div>
                <div className="flex-1 w-2/3 rounded-lg overflow-hidden">
                    <iframe
                        src="https://yandex.ru/map-widget/v1/?um=constructor%3A8c845fd06d0c7a2c32a33cc0b719fa9ebb1930f88440ec521c06fa4349259f32&amp;source=constructor"
                        width="100%"
                        height="553"
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
                <h3 className="mb-3 text-xl font-semibold">{name}</h3>
                <p>{address}</p>
            </div>

            <Separator />
        </>
    )
}
