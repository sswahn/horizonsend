/**
 * Cookie Utility
 * 
 */

class CookieUtility {
  static get(request) {
    return request.signedCookies['user']
  }

  static set(data, response) {
    response.cookie('user', data.ops[0].uuid, {
      expires: new Date(Date.now() + 100000),
      httpOnly: true,
      signed: true
    })
    return data
  }
}

module.exports = CookieUtility