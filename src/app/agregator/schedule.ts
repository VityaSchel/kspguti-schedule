import { Day } from '@/shared/model/day'
import { parsePage } from '@/app/parser/schedule'
import contentTypeParser from 'content-type'
// import { parse } from 'node-html-parser'
import { JSDOM } from 'jsdom'
import { content as mockContent } from './mock'

// ПС-7: 146
export async function getSchedule(groupID: number): Promise<Day[]> {
  // const page = await fetch(`${process.env.PROXY_URL ?? 'https://lk.ks.psuti.ru'}/?mn=2&obj=${groupID}`)
  const page = { text: async () => mockContent, status: 200, headers: { get: (s: string) => s && 'text/html' } }
  const content = await page.text()
  const contentType = page.headers.get('content-type')
  if (page.status === 200 && contentType && contentTypeParser.parse(contentType).type === 'text/html') {
    try {
      const root = new JSDOM(content).window.document
      return parsePage(root)
    } catch(e) {
      console.error('Error while parsing lk.ks.psuti.ru')
      throw e
    }
  } else {
    console.error(page.status, contentType)
    console.error(content.length > 500 ? content.slice(0, 500 - 3) + '...' : content)
    throw new Error('Error while fetching lk.ks.psuti.ru')
  }
}