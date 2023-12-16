import express from 'express'
import * as Path from 'node:path'

import mapRoutes from './routes/maps'
import detailsRoutes from './routes/details'
import currentRoutes from './routes/current'

const server = express()

server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use('/api/v1/maps', mapRoutes)
server.use('/api/v1/details', detailsRoutes)
server.use('/api/v1/current/', currentRoutes)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
