const Router = require('express')
const userController = require('../controllers/userController')
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/additional', userController.additional)
router.post('/lastview', userController.lastview)
router.get('/auth', authMiddleware, userController.check)

module.exports = router
