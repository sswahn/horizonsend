const express = require('express')
const router = express.Router()

const RegistrationController = require('../controllers/RegistrationController')

router.post('/api/v1/registration', RegistrationController.create)
router.put('/api/v1/activate/:token', RegistrationController.activate)

module.exports = router
