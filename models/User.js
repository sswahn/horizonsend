/**
 * User Model
 * 
 */

const Cookie = require('../utilities/CookieUtility')

class User {
  static validate(request) {
    const cookie = Cookie.get(request)
    const user = getUser(request, cookie)
    return user.then(data => this.confirmUser(data))
      .then(data => this.validateUser(request, data))
      .catch(error => console.error(error))
  }

  getUser(request, cookie) {
    return request.database.collection('logins')
      .find({ uuid: cookie })
      .toArray()
  }

  confirmUser(data) {
    if (!data[0].username) {
      throw new Error('User not found.')
    }
    return data
  }

  validateUser(request, data) {
    const user = request.database.collection('users')
      .find({username: data[0].username })
      .toArray()
    if (!user[0].is_admin) {
      throw new Error('Invalid user.')
    }
    return data
  }
}

module.exports = User