/**
 * User Model
 * 
 */

class User {

  static async validate(cookie) {
    return await request.database.collection('login')
      .find({ uuid: cookie })
      .toArray()
  }
}

module.exports = User