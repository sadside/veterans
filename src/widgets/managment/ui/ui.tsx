import one from '@/assets/images/managment/Veterans Prosecution Rectangle (7).png'
import trow from '@/assets/images/managment/Rectangle 1267 Veterans Prosecution.png'
import main from '@/assets/images/managment/Veterans Prosecutor.png'

const data = [
    {
        name: 'Александр Алексеевич Громыко',
        image: one.src,
        description:
            'Председатель совета ветеранов Новосибирского регионального отделения ',
    },
    {
        name: 'Владимир Федорович Самочернов',
        image: trow.src,
        description:
            'Заместитель председателя совета ветеранов Новосибирского регионального отделения ',
    },
]

const members = [
    {
        name: 'Н.Б. Гончарова',
        position: 'Секретарь совета ветеранов',
    },
    {
        name: 'Л.Ю. Басов',
        position: 'Член совета ветеранов',
    },
    {
        name: 'В.А. Ковтун',
        position: 'Член совета ветеранов',
    },
    {
        name: 'П.В. Макаренко',
        position: 'Член совета ветеранов',
    },
    {
        name: 'В.М. Васенко',
        position: 'Член совета ветеранов',
    },
]

export const Managment = () => {
    return (
        <div>
            <h2 className="text-4xl font-semibold mb-14">Руководство</h2>
            <div className="flex justify-between gap-8">
                {data.map((item) => (
                    <MainBlock
                        name={item.name}
                        image={item.image}
                        description={item.description}
                    />
                ))}
                <div className="flex-1 w-1/2">
                    <img
                        src={main.src}
                        className="mb-5 h-[295px] w-full"
                        alt=""
                    />

                    <div className="grid grid-cols-3 grid-rows-2 gap-x-6 gap-y-1">
                        {members.map((member, index) => (
                            <div key={index}>
                                <h3 className="font-semibold mb-1">
                                    {member.name}
                                </h3>
                                <p className="text-[14px] text-[#858181]">
                                    {member.position}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

const MainBlock = ({
    name,
    image,
    description,
}: {
    name: string
    image: string
    description: string
}) => {
    return (
        <div className="w-1/4">
            <img src={image} alt="" className="mb-5" />
            <h2 className="mb-3 font-semibold text-[16px]">{name}</h2>
            <p className="text-[#858181]">{description}</p>
        </div>
    )
}
