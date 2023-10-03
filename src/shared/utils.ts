import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDayOfWeek(date: Date): 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday' {
  const weekDays = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday'
  ] as const
  return weekDays[date.getDay()] 
}