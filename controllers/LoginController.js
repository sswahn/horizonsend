/**
 * Login Controller
 * 
 */

const Login = require('../models/Login')
const Cookie = require('../utilities/CookieUtility')

class LoginController {
  static post(request, response) {
    const login = new Login(request)
    const findUser = login.findUser()
    return findUser.then(data => login.verifyUser(data))
      .then(data => login.loginUser(data))
      .then(data => Cookie.set(data, response))
      .then(data => response.status(201).json(data))
      .catch(error => response.status(400).json({ error: error.message })
    )
  }
}

module.exports = LoginController