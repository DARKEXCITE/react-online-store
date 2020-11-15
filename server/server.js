import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import sockjs from 'sockjs'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'

import cookieParser from 'cookie-parser'
import config from './config'
import Html from '../client/html'

const { readFile, writeFile, stat } = require('fs').promises

const Root = () => ''

let connections = []

const port = process.env.PORT || 8090
const server = express()

const setHeaders = (req, res, next) => {
  res.set('x-skillcrucial-user', '68050c65-85a4-403e-a4ed-2feb377a72dd')
  res.set('Access-Control-Expose-Headers', 'X-SKILLCRUCIAL-USER')
  next()
}

const middleware = [
  cors(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  bodyParser.json({ limit: '50mb', extended: true }),
  cookieParser(),
  setHeaders
]

middleware.forEach((it) => server.use(it))

server.get('/api/v1/goods', async (req, res) => {
  await readFile(`${__dirname}/data/goods.json`, { encoding: 'utf8' })
      .then((text) => {
          res.json(JSON.parse(text))
      })
      .catch(() => {
        res.json({ status: 'Логи не существнуют' })
      })
})

server.post('/api/v1/logs', async (req, res) => {
  await readFile(`${__dirname}/data/logs.json`, { encoding: 'utf8' })
      .then((text) => {
        const arrLogs = JSON.parse(text)
        const date = new Date
        const newLog = { ...req.body, date }
        arrLogs.push(newLog)

        writeFile(`${__dirname}/data/logs.json`, JSON.stringify(arrLogs), { encoding: "utf8" }).then(() => {
            res.json({ status: 'Добавлена новая запись', log: newLog })
        })
      })
      .catch(() => {
        const date = new Date()
        const arrLogs = [{ ...req.body, date }]

        writeFile(`${__dirname}/data/logs.json`, JSON.stringify(arrLogs), { encoding: "utf8" }).then(() => {
            res.json({ status: 'Файл успешно создан' })
        })
      })
})

server.delete('/api/v1/logs', async (req, res) => {
  await stat(`${__dirname}/data/logs.json`)
      .then(() => {
          writeFile(`${__dirname}/data/logs.json`, JSON.stringify([]), { encoding: "utf8" }).then(() => {
              res.json({ status: 'Логи очищены' })
          })
      })
      .catch(() => {
          res.json({ status: 'Логи не существуют' })
      })
})

server.get('/api/v1/logs', async (req, res) => {
  await readFile(`${__dirname}/data/logs.json`, { encoding: 'utf8' })
      .then((text) => {
          res.json(JSON.parse(text))
      })
      .catch(() => {
        res.json({ status: 'Логи не существуют' })
      })
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

const [htmlStart, htmlEnd] = Html({
  body: 'separator',
  title: 'Skillcrucial - Become an IT HERO'
}).split('separator')

server.get('/', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

server.get('/*', (req, res) => {
  const initialState = {
    location: req.url
  }

  return res.send(
    Html({
      body: '',
      initialState
    })
  )
})

const app = server.listen(port)

if (config.isSocketsEnabled) {
  const echo = sockjs.createServer()
  echo.on('connection', (conn) => {
    connections.push(conn)
    conn.on('data', async () => {})

    conn.on('close', () => {
      connections = connections.filter((c) => c.readyState !== 3)
    })
  })
  echo.installHandlers(app, { prefix: '/ws' })
}
console.log(`Serving at http://localhost:${port}`)
