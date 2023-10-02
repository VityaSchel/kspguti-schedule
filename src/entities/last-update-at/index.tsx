import { formatDistanceStrict } from 'date-fns'
import { ru as dateFnsRuLocale } from 'date-fns/locale'

export function LastUpdateAt({ date }: {
  date: Date
}) {
  return (
    <div className='flex md:justify-end px-4 md:h-0'>
      <span className='text-sm text-border md:whitespace-pre-wrap md:text-right'>
        Последнее обновление:{'\n'}{formatDistanceStrict(date, Date.now(), { locale: dateFnsRuLocale, addSuffix: true })}
      </span>
    </div>
  )
}