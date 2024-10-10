const { Order } = require('../models/models')

class OrderController {
    async create(req, res, next){
        const {products, total} = req.body
        const order = await Order.create(products, total)
        res.json(order)
    }
}