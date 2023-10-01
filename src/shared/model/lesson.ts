export type Lesson = {
  isChange?: boolean
  time: {
    start: string
    end: string
    hint?: string
  }
  type: string
  topic?: string
  resources: {
    type: 'link'
    title: string
    url: string
  }[]
  homework: string
} & (
  {
    subject: string
    teacher?: string
    place?: {
      address: string
      classroom: string
    }
  } | { fallbackDiscipline?: string }
)