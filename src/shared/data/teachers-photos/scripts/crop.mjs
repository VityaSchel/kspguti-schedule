import fs from 'fs/promises'
import path from 'path'
import sharp from 'sharp'

import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url)) + '/'

async function cropImages(imagePaths) {
  try {
    await fs.mkdir(__dirname + '../cropped')
  } catch (err) {
    if (err.code !== 'EEXIST') {
      console.error('Failed to create directory:', err)
      return
    }
  }

  for (const imagePath of imagePaths) {
    const imageFileName = path.basename(imagePath)
    const outputFileName = `${__dirname}../cropped/${imageFileName}`

    try {
      const image = sharp(imagePath)
      const metadata = await image.metadata()

      const minDimension = Math.min(metadata.width, metadata.height)

      await image
        .extract({ left: 0, top: 0, width: minDimension, height: minDimension })
        .resize(96, 96, { fit: 'contain' })
        .toFile(outputFileName)

      console.log(`Successfully cropped ${imageFileName}`)
    } catch (err) {
      console.error(`Failed to crop ${imageFileName}:`, err)
    }
  }
}

const files = await fs.readdir(__dirname + '../sources')
const imagePaths = files
  .filter(f => f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.png'))
  .map(f => __dirname + '../sources/' + f)

await cropImages(imagePaths)