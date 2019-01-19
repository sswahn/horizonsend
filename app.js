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
const registrationPageRouter = require('./routes/registrationPage')
const registrationApiRouter = require('./routes/registrationApi')
const authApiRouter = require('./routes/authApi')
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
  app.use('/', registrationApiRouter)
  app.use('/', authApiRouter)
  app.use('/', newsApiRouter)
  app.use('/', adminPageRouter)

  app.use('/', indexPageRouter)
  app.use('/', loginPageRouter)
  app.use('/', registrationPageRouter)
})
/*
app.use((request, response) => 
  response.status(404).render('error', {
    status: 404,
    message: 'Not found.',
    css: 'login.css'
  })
)*/

module.exports = app
