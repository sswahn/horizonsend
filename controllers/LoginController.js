/**
 * Login Controller
 * 
 */

const Login = require('../models/Login')
const Cookie = require('../utilities/CookieUtility')

class LoginController {
  static post(request, response) {
    const login = new Login()
    const findUser = login.findUser(request)
    return findUser.then(data => login.loginUser(request, data))
      .then(data => Cookie.set(data, response))
      .then(data => response.status(201).json(data))
      .catch(error => {
        console.log('Errorz')
        return response.status(400).json({ error: error.message })
        }
    )
  }
}

module.exports = LoginController