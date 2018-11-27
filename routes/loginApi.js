const express = require('express')
const router = express.Router()

const LoginController = require('../controllers/LoginController')

router.post('/api/v1/login', LoginController.post)

module.exports = router
