import { ISitemapField, getServerSideSitemapLegacy } from 'next-sitemap'
import { GetServerSideProps } from 'next'
import { groups } from '@/shared/data/groups'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const siteURL = 'https://kspsuti.ru'

  const fields = Object.keys(groups).map<ISitemapField>(group => (
    {
      loc: `${siteURL}/${group}`,
      changefreq: 'weekly',
      priority: 0.8
    }
  ))

  return getServerSideSitemapLegacy(ctx, fields)
}

export default function Sitemap() { }