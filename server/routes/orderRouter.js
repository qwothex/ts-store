const Router = require('express')
const orderController = require('../controllers/orderController') 
const router = new Router()

router.post('/', orderController.create)
router.get('/', orderController.getOrders)
 
module.exports = router