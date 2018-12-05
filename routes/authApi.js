const express = require('express')
const router = express.Router()

const AuthController = require('../controllers/AuthController')

router.post('/api/v1/auth/login', AuthController.login)
router.post('/api/v1/auth/logout', AuthController.logout)

module.exports = router
