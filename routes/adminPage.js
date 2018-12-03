const express = require('express')
const router = express.Router()

/* GET admin page. */
router.get('/admin', function(request, response) {
  response.render('admin', { 
    title: "Horizon's End | Video Game Design",
    script: [
      'vuex.js',
      'store.js',
      'createNews.js',
      'updateNews.js',
      'modifyNews.js'
    ]
  })
})

module.exports = router
