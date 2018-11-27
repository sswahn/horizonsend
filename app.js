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

const indexPageRouter = require('./routes/indexPage')
const loginPageRouter = require('./routes/loginPage')
const adminPageRouter = require('./routes/adminPage')

const registrationApiRouter = require('./routes/registrationApi')
const loginApiRouter = require('./routes/loginApi')
const newsApiRouter = require('./routes/newsApi')



const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(helmet())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser(cookieSecret))

app.use(express.static(path.join(__dirname, 'public')))
app.use('/', indexPageRouter)
app.use('/', loginPageRouter)
app.use('/', adminPageRouter)

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
  app.use('/', newsApiRouter)
  app.use('/', registrationApiRouter)
  app.use('/', loginApiRouter)
})

module.exports = app