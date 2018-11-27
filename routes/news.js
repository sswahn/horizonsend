const express = require('express')
const router = express.Router()

const NewsController = require('../controllers/NewsController')

router.get('/api/v1/news', NewsController.get)
router.get('/api/v1/news/:id', NewsController.getOne)
router.post('/api/v1/news', NewsController.post)
router.put('/api/v1/news/:id', NewsController.put)
router.delete('/api/v1/news/:id', NewsController.delete)

module.exports = router;
