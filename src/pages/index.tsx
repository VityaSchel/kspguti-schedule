import { Schedule } from '@/widgets/schedule'
import { Day } from '@/shared/model/day'
import { GetServerSidePropsResult } from 'next'
import { getSchedule } from '@/app/agregator/schedule'
import { NextSerialized, nextDeserializer, nextSerialized } from '@/app/utils/date-serializer'

type PageProps = NextSerialized<{
  schedule: Day[]
}>

export default function HomePage(props: PageProps) {
  const { schedule } = nextDeserializer(props)

  return (
    <Schedule days={schedule} />
  )
}

export async function getServerSideProps(): Promise<GetServerSidePropsResult<PageProps>> {
  const schedule = await getSchedule(146)

  return {
    props: {
      schedule: nextSerialized(schedule)
    }
  }
}