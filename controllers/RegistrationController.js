/**
 * Registration Controller
 * 
 */

const Registration = require('../models/Registration')
const Mailer = require('../utilities/MailerUtility')

class RegistrationController {
  static create(request, response) {
    const hash = request.crypto.randomBytes(20).toString('hex')
    const registration = new Registration()
    const post = registration.create(request, hash)
    Mailer.send(request, hash)
    return post.then(data =>
      response.status(201).json(data)
    ).catch(error =>
      response.status(400).json({ error: error.message })
    )
  }

  static activate(request, response) {
    const registration = new Registration(request)
    const findUser = registration.findUser(request)
    return findUser.then(data => registration.verifyUser(data))
      .then(data => registration.activateUser(data))
      .then(data => response.status(201).json(data))
      .catch(error => response.status(500).json({
        error: error.message
      }))
  }
}

module.exports = RegistrationController