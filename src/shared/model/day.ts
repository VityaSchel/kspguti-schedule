import { Lesson } from '@/shared/model/lesson'

export type Day = {
  date: Date
  weekNumber: number
  lessons: Lesson[]
}