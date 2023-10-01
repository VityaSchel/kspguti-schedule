import fs from 'fs/promises'

import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url)) + '/'

const files = await fs.readdir(__dirname + '../sources')
const images = files
  .filter(f => f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.png'))
  .filter(f => f.startsWith('%'))

for(const image of images) {
  console.log(image, '->', decodeURIComponent(image))
  await fs.rename(__dirname + '../sources/' + image, __dirname + '../sources/' + decodeURIComponent(image))
}