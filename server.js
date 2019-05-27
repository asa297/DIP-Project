const express = require('express')
const app = express()
const server = require('http').createServer(app)

const port = process.env.PORT || 3000
const next = require('next')

// const bodyParser = require("body-parser");

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

nextApp
  .prepare()
  .then(() => {
    app.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, err => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
