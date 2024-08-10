const { Product } = require('../models/models')
const uuid = require('uuid')
const path = require('path')
const ApiError = require('../error/ApiError')

class ProductController {
    async create(req, res, next){
        try{ 
            const {title, description, type, brand, price, memory} = req.body
            const {image} = req.files
            let fileName = uuid.v4() + '.jpg'
            image.mv(path.resolve(__dirname, '..', 'static', fileName))

        const product = await Product.create({title, description, price, brand, type, memory, image: fileName})

        res.json(product)
        }catch(e){
            next(ApiError.badRequest(e.message))
        }
    }
    
    async getAll(req, res) {
        let {brand, type, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit 
        let devices; 
        if(!brand && !type){
            devices = await Product.findAndCountAll({limit, offset})
        }
        if(brand && !type){
            devices = await Product.findAndCountAll({where:{brand}, limit, offset})
        }
        if(!brand && type){
            devices = await Product.findAndCountAll({where:{type}, limit, offset})
        }
        if(brand && type){
            devices = await Product.findAndCountAll({where:{type, brand}, limit, offset})
        }
        return res.json(devices)
    }

    async getOne(req, res) {
        const {id} = req.params
        const device = await Product.findOne({where: {id}})

        return res.json(device)
    }

    async remove(req, _res){
        const {id} = req.params
        return Product.findAll({where: {id}}).then(async (result) => { await Product.destroy({ where: { id } })
        return result})
    }

    async addDiscount(req, res){
        const {id, price} = req.body
        console.log(id)
        const device = await Product.findOne({where: {id}})
        device.discount = price
        device.save()
        return res.json(device)
    }
}

module.exports = new ProductController()