const express = require('express')
const router = express.Router()

/* GET admin page. */
router.get('/login', function(request, response) {
  response.render('login', { 
    title: "Horizon's End | Video Game Design",
    css: 'login.css',
    script: 'login.js'
  })
})

module.exports = router
