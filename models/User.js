/**
 * User Model
 * 
 */

const Cookie = require('../utilities/CookieUtility')

class User {
  static validate(request) {
    const cookie = Cookie.get(request)
    const user = this.getUser(request, cookie) // works
    return user.then(data => this.confirmUser(data))
      .then(data => this.validateUser(request, data))
      .catch(error => console.error(error))
  }

  static getUser(request, cookie) {
    return request.database.collection('logins')
      .find({ uuid: cookie })
      .toArray()
  }

  static confirmUser(data) {
    if (!data[0].username) {
      throw new Error('User not found.')
    }
    return data
  }

  static validateUser(request, data) {
    return request.database.collection('users')
      .find({ username: data[0].username, is_admin: 1 })
      .toArray()
  }
}

module.exports = User