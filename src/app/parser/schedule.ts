import { Day } from '@/shared/model/day'
import { Lesson } from '@/shared/model/lesson'
import { HTMLElement } from 'node-html-parser'

const dayTitleParser = (text: string) => {
  const [dateString, week] = text.trim().split(' / ')
  const weekNumber = Number(week.trim().match(/^(\d+) неделя$/)![1])
  const [, day, month, year] = dateString.trim().match(/^[а-яА-Я]+ (\d{1,2})\.(\d{1,2})\.(\d{4})$/)!
  const date = new Date(Number(year), Number(month) - 1, Number(day), 12)
  return { date, weekNumber }
}

const parseLesson = (row: HTMLElement): Lesson => {
  const cells = row.querySelectorAll(':scope > td')

  const isChange = cells.every(td => td.getAttribute('bgcolor') === 'ffffbb')

  const timeCell = cells[1].childNodes
  const [startTime, endTime] = timeCell[0].textContent.trim().split(' – ')
  const time: Lesson['time'] = {
    start: startTime,
    end: endTime
  }
  if (timeCell[2]) {
    time.hint = timeCell[2].textContent.trim()
  }

  const subject = ''
  const teacher = ''

  const place: Lesson['place'] = {
    address: '1',
    classroom: 1
  }

  const topic = cells[4].textContent.trim()

  const resources: Lesson['resources'] = []
  // {
  //   type: 'link'
  //   title: string
  //   url: string
  // } []

  return {
    isChange,
    time,
    type: cells[2].textContent.trim(),
    subject, 
    teacher,
    place,
    ...(topic && { topic }),
    resources,
    homework: cells[6].textContent.trim()
  }
}

export function parsePage(document: HTMLElement): Day[] {
  const tables = Array.from(document.querySelectorAll('body > table'))
  const table = tables.find(table => table.querySelector(':scope > tbody > tr:first-child')?.textContent?.trim() === 'ПС-7')
  const rows = Array.from(table!.querySelectorAll(':scope > tbody > tr')).slice(1)

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
      dayLessons.push(parseLesson(row))
    }
  }

  return days
}