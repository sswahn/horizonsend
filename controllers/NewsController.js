/**
 * News Controller
 * 
 */

const User = require('../models/User')
const News = require('../models/News')

class NewsController {
  static get(request, response) {
    const news = new News()
    const get = news.get(request)
    return get.then(data =>
      response.status(200).json(data)
    ).catch(error =>
      response.status(400).json(error)  
    )
  }

  static getOne(request, response) {
    const news = new News()
    const getOne = news.getOne(request)
    return getOne.then(data =>
      response.status(200).json(data)
    ).catch(error =>
      response.status(400).json(error)  
    )
  }

  static async post(request, response) {
    const user = await User.validate(request)
    const news = new News()
    const post = news.post(request, user)
    return; post.then(data =>
      response.status(201).json(data)
    ).catch(error =>
      response.status(400).json(error)  
    )
  }

  static async put(request, response) {
    const user = await User.validate(request)
    const news = new News()
    const put = news.put(request, user)
    return put.then(data =>
      response.status(201).json(data)
    ).catch(error =>
      response.status(400).json(error)  
    )
  }

  static async delete(request, response) {
    const user = await User.validate(request)
    const news = new News()
    const del = news.delete(request, user)
    return del.then(data =>
      response.status(204).json(data)
    ).catch(error =>
      response.status(400).json(error)  
    )
  }
}

module.exports = NewsController