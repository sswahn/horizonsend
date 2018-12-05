const express = require('express')
const router = express.Router()

const AdminPageController = require('../controllers/AdminPageController')

router.get('/admin', AdminPageController.render)

module.exports = router
