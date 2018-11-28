/**
 * Login Model
 * 
 */

class Login {
  constructor(request){
    this.request = request
  }
  
  findUser() {
    if (this.request.body.email === undefined) {
      throw new Error('Email is required.')
    }
    if (this.request.body.password === undefined) {
      throw new Error('Password is required.')
    }
    const params = {
      email: this.request.body.email,
      password: this.request.body.password
    }
    return this.request.database.collection('users').find(params).toArray()
  }

  verifyUser(document) {
    if (document[0].is_verified === 0) {
      throw new Error('User account must be verified before logging in.')
    }
    return document
  }

  loginUser(document) {
    const params = {
      username: document[0].username,
      createdAt: new Date(),
      uuid: this.request.uuid()
    }
    return this.request.database.collection('logins').replaceOne(
      { username: document[0].username }, params, { upsert: true }
    )
  }
}

module.exports = Login