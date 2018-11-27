const { MongoClient, ObjectId } = require('mongodb')
const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const crypto = require('crypto')
const uuid = require('uuid/v4')
const mailer = require('nodemailer')
const path = require('path')
const cookieParser = require('cookie-parser')
const cookieSecret = process.env.COOKIE_SECRET || 'TEMP_SECRET'
const logger = require('morgan')

const indexRouter = require('./routes/index')
const registrationRouter = require('./routes/registration')
const newsRouter = require('./routes/news')
const loginRouter = require('./routes/login')


const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(helmet())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'public')))
app.use('/', indexRouter)

MongoClient.connect('mongodb://localhost:27017', 
{ useNewUrlParser: true }, (error, client) => {
  app.use((request, response, next) => {
    request.database = client.db('horizonsend')
    request.ObjectId = ObjectId
    request.crypto = crypto
    request.uuid = uuid
    request.mailer = mailer
    next()
  })
  app.use('/', newsRouter)
  app.use('/', registrationRouter)
  app.use('/', loginRouter)
})

module.exports = app