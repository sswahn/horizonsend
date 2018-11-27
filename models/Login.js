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
    const collection = this.request.database.collection('users')
    return collection.find(params).toArray()
  }

  verifyUser(document) {
    if (document[0].is_verified === 0) {
      throw new Error('User account must be verified before logging in.')
    }
    return document
  }

  loginUser(document) {
    const collection = this.request.database.collection('logins')
    return collection.insertOne({
      user: document[0].username,
      createdAt: Date.now(),
      uuid: this.request.uuid()
    })
  }
}

module.exports = Login