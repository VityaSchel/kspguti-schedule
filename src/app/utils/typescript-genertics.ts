export type AggregatedProperties<T> = {
  [K in keyof T]: T[K]
}