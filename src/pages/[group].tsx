import { Schedule } from '@/widgets/schedule'
import { Day } from '@/shared/model/day'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { getSchedule } from '@/app/agregator/schedule'
import { NextSerialized, nextDeserializer, nextSerialized } from '@/app/utils/date-serializer'
import { NavBar } from '@/widgets/navbar'
import { LastUpdateAt } from '@/entities/last-update-at'
import { groups } from '@/shared/data/groups'
import crypto from 'crypto'
import React from 'react'
import { getDayOfWeek } from '@/shared/utils'

type PageProps = NextSerialized<{
  schedule: Day[]
  parsedAt: Date
}>

export default function HomePage(props: PageProps) {
  const { schedule, parsedAt } = nextDeserializer(props)

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual'
      }
      const interval = setInterval(async () => {
        const today = getDayOfWeek(new Date())
        const todayBlock = document.getElementById(today)
        if (todayBlock) {
          const GAP = 48
          const HEADER_HEIGHT = 64
          window.scrollTo({ top: todayBlock.offsetTop - GAP - HEADER_HEIGHT })
          clearInterval(interval)
        }
        await new Promise(resolve => setTimeout(resolve, 100))
      })
    }
  }, [schedule])

  return (
    <>
      <NavBar />
      <LastUpdateAt date={parsedAt} />
      <Schedule days={schedule} />
    </>
  )
}

const cachedSchedules = new Map<string, { lastFetched: Date, results: Day[] }>()
const maxCacheDurationInMS = 1000 * 60 * 60
export async function getServerSideProps(context: GetServerSidePropsContext<{ group: string }>): Promise<GetServerSidePropsResult<PageProps>> {
  const group = context.params?.group
  if (group && Object.hasOwn(groups, group) && group in groups) {
    let schedule
    let parsedAt

    const cachedSchedule = cachedSchedules.get(group)
    if (cachedSchedule?.lastFetched && Date.now() - cachedSchedule.lastFetched.getTime() < maxCacheDurationInMS) {
      schedule = cachedSchedule.results
      parsedAt = cachedSchedule.lastFetched
    } else {
      try {
        schedule = await getSchedule(...groups[group])
        parsedAt = new Date()
        cachedSchedules.set(group, { lastFetched: new Date(), results: schedule })
      } catch(e) {
        if (cachedSchedule?.lastFetched) {
          schedule = cachedSchedule.results
          parsedAt = cachedSchedule.lastFetched
        } else {
          throw e
        }
      }
    }

    const getSha256Hash = (input: string) => {
      const hash = crypto.createHash('sha256')
      hash.update(input)
      return hash.digest('hex')
    }

    const etag = getSha256Hash(JSON.stringify(nextSerialized(schedule)))

    const ifNoneMatch = context.req.headers['if-none-match']
    if (ifNoneMatch === etag) {
      context.res.writeHead(304, { ETag: `"${etag}"` })
      context.res.end()
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore Content has not changed
      return { props: {} }
    }

    context.res.setHeader('ETag', `"${etag}"`)
    return {
      props: nextSerialized({
        schedule: schedule,
        parsedAt: parsedAt
      })
    }
  } else {
    return {
      notFound: true
    }
  }  
}