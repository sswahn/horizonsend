/**
 * User Model
 * 
 */

const Cookie = require('../utilities/CookieUtility')

class User {
  static validate(request) {
    const cookie = Cookie.get(request)
    return request.database.collection('logins')
      .find({ uuid: cookie })
      .toArray()
  }
}

module.exports = User