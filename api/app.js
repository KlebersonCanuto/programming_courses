const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const morgan = require('morgan')
const Router = require('./Router')

dotenv.config()
const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use('/', Router)

module.exports = app