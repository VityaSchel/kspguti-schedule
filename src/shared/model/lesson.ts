export type Lesson = {
  isChange?: boolean
  time: {
    start: string
    end: string
    hint?: string
  }
  type: string
  subject: string
  teacher: string
  place: {
    address: string
    classroom: number
  }
  topic?: string
  resources: {
    type: 'link'
    title: string
    url: string
  }[]
  homework: string
}