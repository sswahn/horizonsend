const express = require('express')
const router = express.Router()

router.get('/register', function(request, response) {
  response.render('register', {
    title: "Horizon's End | Register User Account",
    css: 'login.css',
    script: 'register.js'
  })
})

module.exports = router
