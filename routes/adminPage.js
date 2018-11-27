const express = require('express')
const router = express.Router()

/* GET admin page. */
router.get('/admin', function(request, response) {
  response.render('admin', { 
    title: "Horizon's End | Video Game Design",
    script: 'admin.js'
  })
})

module.exports = router
