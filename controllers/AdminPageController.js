/**
 * Admin Page Controller
 * 
 */

const User = require('../models/User')

class AdminPageController {
  static render(request, response) {
    const page = 'admin'
    const params = { 
      title: "Horizon's End | Admin",
      script: [
        'vuex.js',
        'store.js',
        'createNews.js',
        'updateNews.js',
        'modifyNews.js'
      ]
    }
    return User.validate(request)
      .then(user => response.render(page, params))
      .catch(error => response.send(error))
  }
}

module.exports = AdminPageController