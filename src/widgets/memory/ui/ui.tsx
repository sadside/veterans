import { GradientBox } from '@/shared/ui/box/gradient-box'
import memory from '@/assets/images/memory.png'
import { Action } from '@/shared/ui/buttons/action'

export const Memory = () => {
    return (
        <div className="bg-white rounded-3xl p-10 flex gap-20">
            <div className="flex-1 w-1/2">
                <GradientBox className="h-1 w-full mb-10 bg-tricolor-gradient" />
                <h2 className="text-2xl font-semibold mb-5 uppercase">
                    Память жива
                </h2>

                <p className="indent-5 mb-5 font-light">
                    04.10.2024 состоялось торжественное открытие сквера имени
                    участника Великой Отечественной войны, прокурора
                    Центрального района г.Новосибирска Филимоновой Екатерины
                    Дмитриевны.
                </p>
                <p className="indent-5 font-light mb-8">
                    В мероприятии приняли участие прокурор Новосибирской
                    области, и.о. начальника управления Генеральной прокуратуры
                    РФ по СФО Доржиев Баир Валерьевич, мэр города Кудрявцев
                    Максим Георгиевич, ветераны и работники прокуратуры,
                    родственники Екатерины Дмитриевны.
                </p>
                <Action as="button">Подробнее</Action>
            </div>
            <div className="flex-1 w-1/2">
                <img src={memory.src} alt="" />
            </div>
        </div>
    )
}
