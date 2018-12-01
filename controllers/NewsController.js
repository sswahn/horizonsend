/**
 * News Controller
 * 
 */

const User = require('../models/User')
const News = require('../models/News')

class NewsController {
  static get(request, response) {
    const news = new News()
    return news.get(request)
      .then(data => response.status(200).json(data))
      .catch(error => response.status(400).json(error.message))
  }

  static getOne(request, response) {
    const news = new News()
    return news.getOne(request)
      .then(data => response.status(200).json(data))
      .catch(error => response.status(400).json(error.message))
  }

  static post(request, response) {
    const validate = User.validate(request)
    const news = new News()
    return validate.then(user => news.post(request, user))
      .then(data => response.status(201).json(data))
      .catch(error => response.status(400).json(error.message))
  }
  // needs testing (build form):
  static put(request, response) {
    const validate = User.validate(request)
    const news = new News()
    return validate.then(user => news.put(request, user))
      .then(data => response.status(201).json(data))
      .catch(error => response.status(400).json(error.message))
  }
  // needs testing:
  static delete(request, response) {
    const validate = User.validate(request)
    const news = new News()
    return validate.then(user => news.delete(request, user))
      .then(data => response.status(204).json(data))
      .catch(error => response.status(400).json(error.message))
  }
}

module.exports = NewsController