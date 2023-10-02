import type { Day as DayType } from '@/shared/model/day'
import { Day } from '@/widgets/schedule/day'
import { useRouter } from 'next/router'

export function Schedule({ days }: {
  days: DayType[]
}) {
  const group = useRouter().query['group']

  return (
    <div className="flex flex-col p-8 md:p-16 gap-12 md:gap-14">
      {days.map((day, i) => (
        <Day day={day} key={`${group}_day${i}`} />
      ))}
    </div>
  )
}
