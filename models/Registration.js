/**
 * Registration Model
 * 
 */

class Registration {
  constructor(request = undefined) {
    this.request = request
  }

  create(request, hash) {
    if (request.body.username === undefined) {
      throw new Error('Username is required.')
    }
    if (request.body.email === undefined) {
      throw new Error('Email address is required.')
    }
    if (request.body.password.length < 8) {
      throw new Error('Password must be at least 8 characters.')
    }
    if (request.body.password !== request.body.confirm_password) {
      throw new Error('Passwords do not match.')
    }
    const values = {
      username: request.body.username,
      email: request.body.email,
      password: request.body.password,
      date_created: Date.now(),
      date_updated: Date.now(),
      last_logged_in: null,
      is_verified: 0,
      activation: hash,
      uuid: null
    }
    return request.database.collection('users').insertOne(values)
  }

  findUser() {
    return this.request.database.collection('users')
      .find({ activation: this.request.params.token })
      .toArray()
  }

  verifyUser(document) {
    this.request.database.collection('users').updateOne(
      { '_id': this.request.ObjectId(document[0]._id) },
      { $set: { is_verified: 1 }},
    )
    return document
  }

  activateUser(document) {
    return this.request.database.collection('users').updateOne(
      { '_id': this.request.ObjectId(document[0]._id) },
      { $unset: { activation: "" }}
    )
  }
}

module.exports = Registration