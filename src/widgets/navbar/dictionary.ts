import popover4 from '../../assets/images/popover4.jpg'
import popover2 from '../../assets/images/popover2.jpg'
import popover3 from '../../assets/images/popover3.webp'

export const Routes = {
    documents: '/index',
    history: '/history',
    sostav: '/sostav',
    parlament: '/parlament',
    contacts: '/contacts',
    procuraturaHistory: '/procuratura-history',
    procuraturaOblastHistory: '/procuratura-oblast-history',
    vovMembers: '/vovMembers',
    procuraturaVeterans: '/procuratura-veterans',
    vuz: '/vuzi',
    suz: '/suzi',
    schools: '/scholls',
    excursii: '/excursii',
}

export const linkGroups = [
    {
        name: 'Главная',
    },
    {
        name: 'Об организации',
        links: [
            {
                name: 'Документы',
                path: Routes.documents,
                description:
                    'Список ключевых документов, регулирующих деятельность организации.',
            },
            {
                name: 'История создания',
                path: Routes.history,
                description:
                    'Информация о создании и развитии нашей организации.',
            },
            {
                name: 'Состав',
                path: Routes.sostav,
                description:
                    'Структура и состав нашей организации, включая подразделения.',
            },
            {
                name: 'Руководство',
                path: Routes.parlament,
                description:
                    'Сведения о руководителях организации и их обязанностях.',
            },
            {
                name: 'Контакты',
                path: Routes.contacts,
                description: 'Актуальные контактные данные для связи с нами.',
            },
        ],
        image: popover4.src,
        title: 'Об организации',
        description:
            'Информация о документах, истории создания, составе и руководстве. Здесь же указаны наши контакты.',
    },
    {
        name: 'Память жива',
        links: [
            {
                name: 'История органов прокуратуры',
                path: Routes.procuraturaHistory,
                description:
                    'Хронология становления и развития органов прокуратуры.',
            },
            {
                name: 'История прокуратуры области',
                path: Routes.procuraturaOblastHistory,
                description:
                    'История прокуратуры в пределах области, ключевые события и лица.',
            },
            {
                name: 'Участники Великой Отечественной войны',
                path: Routes.vovMembers,
                description:
                    'Информация о ветеранах прокуратуры, участвовавших в Великой Отечественной войне.',
            },
            {
                name: 'Ветераны прокуратуры',
                path: Routes.procuraturaVeterans,
                description:
                    'Истории жизни и профессионального пути ветеранов прокуратуры.',
            },
        ],
        image: popover2.src,
        title: 'Память жива',
        description:
            'История прокуратуры, ветераны и участники войны. Сохраняем память о значимых событиях и людях.',
    },
    {
        name: 'Правовое посвящение',
        links: [
            {
                name: 'ВУЗы',
                path: Routes.vuz,
                description:
                    'Программы и мероприятия для студентов высших учебных заведений.',
            },
            {
                name: 'СУЗы',
                path: Routes.suz,
                description:
                    'Образовательные инициативы для студентов средних профессиональных учебных заведений.',
            },
            {
                name: 'Школы',
                path: Routes.schools,
                description:
                    'Правовое образование и просвещение для школьников.',
            },
            {
                name: 'Экскурсии',
                path: Routes.excursii,
                description:
                    'Организация экскурсий для знакомства с деятельностью органов прокуратуры.',
            },
        ],
        image: popover3.src,
        title: 'Правовое посвящение',
        description:
            'Программы для школ, колледжей, вузов и экскурсии для повышения правовой грамотности.',
    },
]
