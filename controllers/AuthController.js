/**
 * Auth Controller
 * 
 */

const Auth = require('../models/Auth')
const Cookie = require('../utilities/CookieUtility')

class AuthController {
  static login(request, response) {
    const auth = new Auth()
    return auth.findUser(request)
      .then(data => auth.loginUser(request, data))
      .then(data => Cookie.set(response, data))
      .then(data => response.status(201).json(data))
      .catch(error =>  response.status(400).json({ error: error.message }))
  }

  static logout(request, response ) {
    const cookie = Cookie.get(request)
    const auth = new Auth()
    return auth.logoutUser(request, cookie)
      .then(data => Cookie.clear(response, data))
      .then(data => response.status(200).redirect('/'))
      .catch(error => response.status(500).json({error: error.message}))
  }
}

module.exports = AuthController