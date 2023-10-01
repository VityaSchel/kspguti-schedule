import { Day } from '@/shared/model/day'
import { parsePage } from '@/app/parser/schedule'
import contentTypeParser from 'content-type'
import { parse } from 'node-html-parser'
import { content as mockContent } from './mock'

// ПС-7: 146
export async function getSchedule(groupID: number): Promise<Day[]> {
  // const page = await fetch(`https://lk.ks.psuti.ru/?mn=2&obj=${groupID}`)
  const page = { text: async () => mockContent, status: 200, headers: { get: (s: string) => s && 'text/html' } }
  const content = await page.text()
  const contentType = page.headers.get('content-type')
  if (page.status === 200 && contentType && contentTypeParser.parse(contentType).type === 'text/html') {
    const root = parse(content)
    return parsePage(root)
  } else {
    console.error(page.status, contentType)
    console.error(content.length > 500 ? content.slice(0, 500 - 3) + '...' : content)
    throw new Error('Error while fetching lk.ks.psuti.ru')
  }
}