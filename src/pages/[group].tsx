import { Schedule } from '@/widgets/schedule'
import { Day } from '@/shared/model/day'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { getSchedule } from '@/app/agregator/schedule'
import { NextSerialized, nextDeserializer, nextSerialized } from '@/app/utils/date-serializer'
import { NavBar } from '@/widgets/navbar'
import { LastUpdateAt } from '@/entities/last-update-at'
import { groups } from '@/shared/data/groups'
import { useRouter } from 'next/router'
import Head from 'next/head'

type PageProps = NextSerialized<{
  schedule: Day[]
  parsedAt: Date
}>

export default function HomePage(props: PageProps) {
  const { schedule, parsedAt } = nextDeserializer(props)
  const router = useRouter()
  const groupName = groups[router.query.group as string][1]

  return (
    <>
      <Head>
        <title>Расписание {groupName} в Колледже Связи</title>
        <meta name="description" content={`Расписание группы ${groupName} на неделю. Самый удобный и лучший сайт для просмотра расписания КС ПГУТИ.`} />
        <meta name="keywords" content="ПГУТИ, КС ПГУТИ" />
        <meta name="author" content="Viktor Shchelochkov" />
      </Head>
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
      schedule = await getSchedule(...groups[group])
      parsedAt = new Date()
      cachedSchedules.set(group, { lastFetched: new Date(), results: schedule })
    }

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