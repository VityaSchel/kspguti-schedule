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

  const longNames = day.lessons
    .some(lesson => 'subject' in lesson && lesson.subject.length > 20)

  return (
    <div className="flex flex-col gap-5">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {dayOfWeek} <span className='text-muted ml-3'>{Intl.DateTimeFormat('ru-RU', {
          day: 'numeric',
          month: 'long',
          // year: 'numeric'
        }).format(day.date)}</span>
      </h1>
      <div className='overflow-hidden'>
        <div className='overflow-auto'>
          <div className="flex flex-row gap-4 w-max">
            {day.lessons.map((lesson, i) => (
              <Lesson 
                width={longNames ? 450 : 350}
                lesson={lesson} 
                key={i} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}