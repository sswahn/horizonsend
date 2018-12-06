/**
 * Cookie Utility
 * 
 */

class CookieUtility {
  static get(request) {
    return request.signedCookies['user']
  }

  static set(response, data) {
    response.cookie('user', data.ops[0].uuid, {
      expires: new Date(Date.now() + 60 * 60 * 1000),
      //domain: 'horizonsend.com',
      signed: true
      //httpOnly: true,
      //secure: true,
    })
    return data
  }

  static clear(response, data) {
    response.clearCookie('user')
    return data
  }
}

module.exports = CookieUtility