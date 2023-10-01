import type { Day as DayType } from '@/shared/model/day'
import { Lesson } from '@/widgets/schedule/lesson'

export function Day({ day }: {
  day: DayType
}) {
  const dayOfWeek = [
    'Понедельник', 
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье'
  ][day.date.getDay()-1]

  return (
    <div className="flex flex-col gap-5">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {dayOfWeek}
      </h1>
      <div className="flex flex-row gap-4">
        {day.lessons.map((lesson, i) => (
          <Lesson lesson={lesson} key={i} />
        ))}
      </div>
    </div>
  )
}