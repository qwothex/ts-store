const Router = require('express')
const orderController = require('../controllers/orderController') 
const router = new Router()

router.post('/', orderController.create)
router.get('/', orderController.getOrders)
router.get('/:id', orderController.getOneOrder)
router.put('/:id', orderController.changeOrderStatus)

module.exports = router