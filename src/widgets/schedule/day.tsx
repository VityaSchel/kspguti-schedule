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
    <div className="flex flex-col gap-3 md:gap-5">
      <h1 className="scroll-m-20 text-2xl md:text-4xl font-extrabold tracking-tight lg:text-5xl">
        {dayOfWeek} <span className='text-border ml-3'>{Intl.DateTimeFormat('ru-RU', {
          day: 'numeric',
          month: 'long',
          // year: 'numeric'
        }).format(day.date)}</span>
      </h1>
      <div>
        <div className='overflow-auto md:snap-x md:snap-proximity md:-translate-x-16 md:w-[calc(100%+8rem)] scrollbar-hide'>
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-max">
            <div className='snap-start hidden md:block' style={{ flex: '0 0 3rem' }} />
            {day.lessons.map((lesson, i) => (
              <Lesson 
                width={longNames ? 450 : 350}
                lesson={lesson} 
                key={i} 
              />
            ))}
            <div className='snap-start hidden md:block' style={{ flex: `0 0 calc(100vw - 4rem - ${longNames ? 450 : 350}px - 1rem)` }} />
          </div>
        </div>
      </div>
    </div>
  )
}