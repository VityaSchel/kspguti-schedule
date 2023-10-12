/* eslint-disable @typescript-eslint/no-var-requires */
const groups = require('./src/shared/data/groups.json')

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://kspsuti.ru',
  generateRobotsTxt: false,
  generateIndexSitemap: false,
  changefreq: 'weekly',
  exclude: ['/'],
  additionalPaths: async () => Object.keys(groups).map(groupName => `/${groupName}`)
}