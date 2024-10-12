const Router = require('express')
const productController = require('../controllers/productController') 
const router = new Router()
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), productController.create)
router.post('/discount', checkRole('ADMIN'), productController.addDiscount)
router.get('/', productController.getAll)
router.delete('/:id', checkRole('ADMIN'), productController.remove)
router.put('/:id', checkRole('ADMIN'), productController.change)
router.get('/:id', productController.getOne)
 
module.exports = router