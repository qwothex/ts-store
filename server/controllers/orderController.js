const { Order } = require('../models/models')
const ApiError = require('../error/ApiError')

class OrderController{
    async create(req, res, next){
        try{
            const {products, total, userId} = req.body
            const order = await Order.create({products, total, userId})
            res.json(order)
        }catch(e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getOrders(req, res, next){
        try{
            const userId = req.query.id
            const orders = await Order.findAll({where: userId})
            res.json(orders)
        }catch(e){
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new OrderController()