const express = require('express')
const router = express.Router()

/* GET index page. */
router.get('/', function(request, response) {
  response.render('index', { 
    title: "Horizon's End | Video Game Design",
    script: 'news.js'
  })
})

module.exports = router
