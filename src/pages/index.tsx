import { GetServerSidePropsResult } from 'next'

export default function HomePage() { }

export async function getServerSideProps(): Promise<GetServerSidePropsResult<Record<string, never>>> {
  return {
    redirect: {
      destination: '/ps7',
      permanent: false
    }
  }
}