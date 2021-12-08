import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import fetch from 'node-fetch'

if (!process.env.KEY_FOURESQUARE) throw new Error('no KEY-Fouresquare provided')

const app = express()
const port = process.env.PORT || 3001

app.use(express.json())

app.get('/api/places/:lat/:long/:radius', async (req, res) => {
  const { lat, long, radius } = req.params

  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `${process.env.KEY_FOURESQUARE}`,
    },
  }

  const response = await fetch(
    `https://api.foursquare.com/v3/places/search?ll=${lat}%2C${long}&radius=${radius}&categories=19014&limit=25`,
    options
  )
  const places = await response.json()
  res.send(places)
})

app.get('/api/hello', (_request, response) => {
  response.json({ message: 'Hello API!' })
})

app.use('/storybook', express.static('dist/storybook'))

app.use(express.static('dist/app'))

app.get('*', (_request, response) => {
  response.sendFile('index.html', { root: 'dist/app' })
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}!`)
})
