import { GradientBox } from '@/shared/ui/box/gradient-box'
import Heroes from '../../../assets/images/heroes.png'
import medal from '../../../assets/images/medal.png'

export const VeteranMemorial = () => {
    return (
        <div className="relative pb-11">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-5 text-left md:text-center">
                Вечная слава Героям!
            </h2>
            <GradientBox className="w-[200px] sm:w-[300px] md:w-[400px] h-[2px] bg-tricolor-gradient mb-5 mx-0 md:mx-auto" />
            <img
                src={medal.src}
                width={60}
                className="absolute top-0 right-6 md:right-11"
                alt="Медаль"
            />
            <div className="flex flex-col lg:flex-row gap-7">
                <div className="shrink-0 flex flex-col md:items-center md:justify-center">
                    <img
                        src={Heroes.src}
                        width={556}
                        alt="Герои"
                        className="mb-2 w-full max-w-[556px]"
                    />
                    <strong className="text-[#4E4E4E] md:text-center">
                        296-ая годовщина со дня создания прокуратуры
                    </strong>
                </div>
                <div className="font-light mt-4 lg:mt-0">
                    <p className="mb-3 indent-5">
                        В нашем обществе ветераны и пенсионеры органов
                        прокуратуры играют неизмеримо важную роль. Их труд и
                        самоотверженность в сфере защиты закона и правопорядка
                        формировали основы современного правового государства и
                        способствовали справедливости в обществе.
                    </p>
                    <p className="indent-5">
                        Проработав многие годы в органах прокуратуры, ветераны
                        накопили огромный объем знаний и практического опыта. Их
                        взгляды на правоохранительную деятельность, понимание
                        динамики преступности и правонарушений, а также умение
                        анализировать юридические нормы делают их незаменимыми
                        консультантами и наставниками для молодых прокуроров.
                        Передача опыта через обучение и наставничество способна
                        значительно повысить качество работы органов
                        прокуратуры. Их знания, опыт и активная жизненная
                        позиция способствуют укреплению правопорядка и
                        справедливости в обществе.
                    </p>
                </div>
            </div>
        </div>
    )
}
