import { Day } from '@/shared/model/day'
import { Lesson } from '@/shared/model/lesson'
import { parseLesson } from '@/app/parser/lesson'

const dayTitleParser = (text: string) => {
  const [dateString, week] = text.trim().split(' / ')
  const weekNumber = Number(week.trim().match(/^(\d+) неделя$/)![1])
  const [, day, month, year] = dateString.trim().match(/^[а-яА-Я]+ (\d{1,2})\.(\d{1,2})\.(\d{4})$/)!
  const date = new Date(Number(year), Number(month) - 1, Number(day), 12)
  return { date, weekNumber }
}

export function parsePage(document: Document, groupName: string): Day[] {
  const tables = Array.from(document.querySelectorAll('body > table'))
  const table = tables.find(table => table.querySelector(':scope > tbody > tr:first-child')?.textContent?.trim() === groupName)
  const rows = Array.from(table!.children[0].children).filter(el => el.tagName === 'TR').slice(2)

  const days = []
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  let dayInfo: Day = {}
  let dayLessons: Lesson[] = []
  let previousRowIsDayTitle = false
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]

    const isDivider = row.textContent?.trim() === ''
    const isDayTitle = dayLessons.length === 0 && !('date' in dayInfo)
    const isTableHeader = previousRowIsDayTitle

    if (isDivider) {
      days.push({ ...dayInfo, lessons: dayLessons })
      dayLessons = []
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dayInfo = {}
      previousRowIsDayTitle = false
    } else if (isTableHeader) {
      previousRowIsDayTitle = false
      continue
    } else if (isDayTitle) {
      const { date, weekNumber } = dayTitleParser(row.querySelector('h3')!.textContent!)
      dayInfo.date = date
      dayInfo.weekNumber = weekNumber
      previousRowIsDayTitle = true
    } else {

      try {
        const lesson = parseLesson(row)
        if (lesson !== null)
          dayLessons.push(lesson)
      } catch (e) {
        console.error('Error while parsing lesson in table', e, row.textContent?.trim())
      }
    }
  }

  return days
}