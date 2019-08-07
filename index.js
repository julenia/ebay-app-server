const express = require('express')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const app = express()
const cors = require('cors')
const middleware = cors()
const port = 4000
const router = require('./db')

app.use(middleware)
app.use(jsonParser)
app.use(router)

app.listen(port, console.log(`Listen to port: ${port}`))