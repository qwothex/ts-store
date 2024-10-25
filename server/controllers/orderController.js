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
            const {userId} = req.query
            console.log(userId)
            const orders = await Order.findAll({where: {userId}})
            res.json(orders)
        }catch(e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getOneOrder(req, res, next){
        try{
            const id = req.params
            const order = await Order.findOne({where: id})
            res.json(order)
        }catch(e){
            next(ApiError.badRequest(e.message))
        }
    }

    async changeOrderStatus(req, res, next){
        try{
            const id = req.params
            const {status} = req.body.params
            console.log(status)
            const order = await Order.findOne({where: id})
            order.status = status
            order.save()
            res.json(order)
        }catch(e){
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new OrderController()