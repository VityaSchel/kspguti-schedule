export type Lesson_commonProperties = {
  isChange?: boolean
  time: {
    start: string
    end: string
    hint?: string
  }
  type?: string
  topic?: string
  resources: {
    type: 'link'
    title: string
    url: string
  }[]
  homework?: string
}

export type Lesson_fullParsedProperties = {
  subject: string
  teacher?: string
  place?: {
    address: string
    classroom: string
  }
}

export type Lesson_fallbackParsedProperties = { 
  fallbackDiscipline?: string 
}

export type Lesson = Lesson_commonProperties
  & (Lesson_fullParsedProperties | Lesson_fallbackParsedProperties)