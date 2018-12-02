/**
 * Login Model
 * 
 */

class Login {
  findUser(request) {
    if (request.body.email === undefined) {
      throw new Error('Email is required.')
    }
    if (request.body.password === undefined) {
      throw new Error('Password is required.')
    }
    const params = {
      email: request.body.email,
      password: request.body.password,
      is_verified: 1
    }
    return request.database.collection('users').find(params).toArray()
  }

  loginUser(request, data) {
    console.log('DATA', data.length)
    if (data.length < 1) {
      throw new Error('Invalid user request: Either your email or password is incorrect, or your account is unverified.')
    }
    const params = {
      username: data[0].username,
      createdAt: new Date(),
      uuid: request.uuid()
    }
    return request.database.collection('logins').replaceOne(
      { username: data[0].username }, params, { upsert: true }
    )
  }
}

module.exports = Login