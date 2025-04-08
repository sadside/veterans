import Heroes from '../../../assets/images/heroes.png'
import medal from '../../../assets/images/medal.png'
import { Action } from '@/shared/ui/buttons/action'
import { GradientBox } from '@/shared/ui/box/gradient-box'
import { IntroductionHat } from './IntroductionHat'

export const Introduction = () => {
    return (
        <>
            <IntroductionHat />
            <GradientBox className="h-[2px] w-full mb-[80px]" />

            <div className="rounded-lg overflow-hidden mb-[80px]">
                <iframe
                    width="100%"
                    height="600"
                    src="https://rutube.ru/play/embed/1aa3806c7f8715278dd993643dbeaaa4"
                    frameBorder="0"
                    allow="clipboard-write; autoplay"
                    webkitAllowFullScreen
                    mozallowfullscreen
                    allowFullScreen
                ></iframe>
            </div>

            <div className="relative pb-11">
                <h2 className="text-4xl font-semibold mb-5">
                    Вечная слава Героям!
                </h2>
                <GradientBox className="w-[400px] h-[2px] bg-tricolor-gradient mb-5" />
                <img
                    src={medal.src}
                    width={80}
                    className="absolute top-0 right-11"
                />
                <div className="flex gap-7">
                    <div className="shrink-0">
                        <img
                            src={Heroes.src}
                            width={556}
                            alt=""
                            className="mb-2"
                        />
                        <strong className="text-[#4E4E4E]">
                            296-ая годовщина со дня создания прокуратуры
                        </strong>
                    </div>
                    <div className="font-light">
                        <p className="mb-3 indent-5">
                            В нашем обществе ветераны и пенсионеры органов
                            прокуратуры играют неизмеримо важную роль. Их труд и
                            самоотверженность в сфере защиты закона и
                            правопорядка формировали основы современного
                            правового государства и способствовали
                            справедливости в обществе.
                        </p>
                        <p className="indent-5">
                            Проработав многие годы в органах прокуратуры,
                            ветераны накопили огромный объем знаний и
                            практического опыта. Их взгляды на
                            правоохранительную деятельность, понимание динамики
                            преступности и правонарушений, а также умение
                            анализировать юридические нормы делают их
                            незаменимыми консультантами и наставниками для
                            молодых прокуроров. Передача опыта через обучение и
                            наставничество способна значительно повысить
                            качество работы органов прокуратуры. Их знания, опыт
                            и активная жизненная позиция способствуют укреплению
                            правопорядка и справедливости в обществе.{' '}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
