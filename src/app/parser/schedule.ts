import { Day } from '@/shared/model/day'
import { Lesson } from '@/shared/model/lesson'

const dayTitleParser = (text: string) => {
  const [dateString, week] = text.trim().split(' / ')
  const weekNumber = Number(week.trim().match(/^(\d+) неделя$/)![1])
  const [, day, month, year] = dateString.trim().match(/^[а-яА-Я]+ (\d{1,2})\.(\d{1,2})\.(\d{4})$/)!
  const date = new Date(Number(year), Number(month) - 1, Number(day), 12)
  return { date, weekNumber }
}

const parseLesson = (row: Element): Lesson | null => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const lesson: LessonObject = {}

  try {
    const cells = Array.from(row.querySelectorAll(':scope > td'))
    if (cells[3].textContent!.trim() === 'Свободное время') return null

    lesson.isChange = cells.every(td => td.getAttribute('bgcolor') === 'ffffbb')

    const timeCell = cells[1].childNodes
    const [startTime, endTime] = timeCell[0].textContent!.trim().split(' – ')
    lesson.time = {
      start: startTime ?? '',
      end: endTime ?? ''
    }
    if (timeCell[2]) {
      lesson.time.hint = timeCell[2].textContent!.trim()
    }

    try {
      lesson.subject = cells[3].childNodes[0].textContent!.trim()

      const teacherCell = cells[3].childNodes[2]
      if (teacherCell) {
        lesson.teacher = teacherCell.textContent!.trim()
      }

      const placeCell = cells[3].childNodes[3]

      if (placeCell) {
        lesson.place = {
          address: placeCell.childNodes[1].textContent!.trim(),
          classroom: placeCell.childNodes[3].textContent!.trim().match(/^Кабинет: ([^ ]+)(-2)?$/)![1]
        }
      }
    } catch(e) {
      console.error('Error while parsing discipline', e, cells[3].textContent?.trim())
      lesson.fallbackDiscipline = cells[3].textContent?.trim()
    }

    lesson.topic = cells[4].textContent!.trim()

    lesson.resources = []
    Array.from(cells[5].querySelectorAll('a'))
      .forEach(a => {
        lesson.resources.push({
          type: 'link',
          title: a.textContent!.trim(),
          url: a.getAttribute('href')!
        })
      })

    return lesson
  } catch(e) {
    console.error('Error while parsing lesson in table', e, row.textContent?.trim())
    return null
  }
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
      const lesson = parseLesson(row)
      if(lesson !== null)
        dayLessons.push(lesson)
    }
  }

  return days
}