const isDate = (value: any): boolean => Object.prototype.toString.call(value) === '[object Date]'

export const nextSerialized = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(nextSerialized)
  }

  if (typeof obj === 'object' && obj !== null) {
    const newObj: any = {}
    for (const [key, value] of Object.entries(obj)) {
      newObj[key] = isDate(value as Date) ? (value as Date).toISOString() : nextSerialized(value)
    }
    return newObj
  }

  return obj
}

const looksLikeISODate = (value: string): boolean => /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z?$/.test(value)

export const nextDeserializer = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(nextDeserializer)
  }

  if (typeof obj === 'object' && obj !== null) {
    const newObj: any = {}
    for (const [key, value] of Object.entries(obj)) {
      newObj[key] = typeof value === 'string' && looksLikeISODate(value) ? new Date(value) : nextDeserializer(value)
    }
    return newObj
  }

  return obj
}


export type NextSerialized<T> = {
  [K in keyof T]:
  T[K] extends Date ? string :
  T[K] extends Array<infer U> ? NextSerialized<U>[] :
  T[K] extends object ? NextSerialized<T[K]> :
  T[K]
};