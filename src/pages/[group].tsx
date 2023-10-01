import { Schedule } from '@/widgets/schedule'
import { Day } from '@/shared/model/day'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { getSchedule } from '@/app/agregator/schedule'
import { NextSerialized, nextDeserializer, nextSerialized } from '@/app/utils/date-serializer'
import { NavBar } from '@/widgets/navbar'

type PageProps = NextSerialized<{
  schedule: Day[]
}>

export default function HomePage(props: PageProps) {
  const { schedule } = nextDeserializer(props)

  return (
    <>
      <NavBar />
      <Schedule days={schedule} />
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext<{ group: string }>): Promise<GetServerSidePropsResult<PageProps>> {
  const groups: { [group: string]: [number, string] } = {
    ps7: [146, 'ПС-7'],
    pks35k: [78, 'ПКС-35к']
  }
  const group = context.params?.group
  if (group && Object.hasOwn(groups, group) && group in groups) {
    const schedule = await getSchedule(...groups[group])
    return {
      props: {
        schedule: nextSerialized(schedule)
      }
    }
  } else {
    return {
      notFound: true
    }
  }  
}