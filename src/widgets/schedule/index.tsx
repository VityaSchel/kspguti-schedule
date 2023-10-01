import type { Day as DayType } from '@/shared/model/day'
import { Day } from '@/widgets/schedule/day'

export function Schedule({ days }: {
  days: DayType[]
}) {

  return (
    <div>
      {days.map((day, i) => (
        <Day day={day} key={i} />
      ))}
    </div>
  )
}
