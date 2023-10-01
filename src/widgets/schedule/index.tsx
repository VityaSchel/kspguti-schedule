import type { Day as DayType } from '@/shared/model/day'
import { Day } from '@/widgets/schedule/day'

export function Schedule({ days }: {
  days: DayType[]
}) {

  return (
    <div className="flex flex-col p-16 gap-14">
      {days.map((day, i) => (
        <Day day={day} key={i} />
      ))}
    </div>
  )
}
