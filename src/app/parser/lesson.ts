import { Lesson as MergedLesson, Lesson_commonProperties, Lesson_fallbackParsedProperties, Lesson_fullParsedProperties } from '@/shared/model/lesson'
type Lesson = Lesson_commonProperties & Lesson_fallbackParsedProperties & Lesson_fullParsedProperties

export const parseLesson = (row: Element): MergedLesson | null => {
  const cells = Array.from(row.querySelectorAll(':scope > td'))
  if (cells[3].textContent!.trim() === 'Свободное время') return null

  const getIsChange = (): Lesson['isChange'] => {
    return cells.every(td => td.getAttribute('bgcolor') === 'ffffbb')
  }

  const getTime = (): Lesson['time'] => {
    const timeCell = cells[1].childNodes
    const [startTime, endTime] = timeCell[0].textContent!.trim().split(' – ')
    const time: Lesson['time'] = {
      start: startTime ?? '',
      end: endTime ?? ''
    }
    if (timeCell[2]) {
      time.hint = timeCell[2].textContent!.trim()
    }

    return time
  }

  const getTopic = (): Lesson['topic'] => {
    return cells[4].textContent!.trim()
  }

  const getResources = () => {
    const resources: Lesson['resources'] = []
    Array.from(cells[5].querySelectorAll('a'))
      .forEach(a => {
        resources.push({
          type: 'link',
          title: a.textContent!.trim(),
          url: a.getAttribute('href')!
        })
      })

    return resources
  }

  const getType = (): Lesson['type'] => {
    return cells[2].textContent!.trim() || undefined
  }

  const getHomework = (): Lesson['homework'] => {
    return cells[6].textContent!.trim() || undefined
  }

  const lesson: Lesson_commonProperties = {
    isChange: getIsChange(),
    time: getTime(),
    topic: getTopic(),
    resources: getResources(),
    type: getType(),
    homework: getHomework()
  }

  const getTeacher = (): Lesson['teacher'] => {
    const teacherCell = cells[3].childNodes[2]
    if (teacherCell) {
      return teacherCell.textContent!.trim()
    }
  }

  const getSubject = (): Lesson['subject'] => {
    return cells[3].childNodes[0].textContent!.trim()
  }

  const getPlace = (): Lesson['place'] => {
    const placeCell = cells[3].childNodes[3]

    if (placeCell) {
      return {
        address: placeCell.childNodes[1].textContent!.trim(),
        classroom: placeCell.childNodes[3].textContent!.trim().match(/^Кабинет: ([^ ]+)(-2)?$/)![1]
      }
    }
  }

  const getFallbackDiscipline = (): Lesson['fallbackDiscipline'] => {
    return cells[3].textContent?.trim()
  }

  let lessonAdditionalProperties: Lesson_fallbackParsedProperties | Lesson_fullParsedProperties = {}
  try {
    lessonAdditionalProperties = {
      subject: getSubject(),
      teacher: getTeacher(),
      place: getPlace(),
    }
  } catch(e) {
    console.error('Error while parsing discipline', e, cells[3].textContent?.trim())
    lessonAdditionalProperties = {
      fallbackDiscipline: getFallbackDiscipline()
    }
  }
  
  const mergedLesson: MergedLesson = { ...lesson, ...lessonAdditionalProperties }
  return mergedLesson
}