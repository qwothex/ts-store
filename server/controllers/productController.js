const { Product } = require('../models/models')
const uuid = require('uuid')
const path = require('path')
const ApiError = require('../error/ApiError')

class ProductController {
    async create(req, res, next){
        try{ 
            const {title, description, type, brand, price, memory, detailedDescription} = req.body
            const {image} = req.files
            let fileName = uuid.v4() + '.jpg'
            image.mv(path.resolve(__dirname, '..', 'static', fileName))
            
        const product = await Product.create({title, description, price, brand, type, memory, image: fileName, detailedDescription})
        res.json(product)
        }catch(e){
            next(ApiError.badRequest(e.message))
            console.log(e)
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
        let {id} = req.params
        id = Number(id)
        if(typeof id == 'number' && id % 1 == 0){
            try{
                const device = await Product.findOne({where: {id}})
                if(device){
                    return res.json(device)
                }else{
                    return res.status(404).json({message:'The product does not exist'})
                }
            }catch{
                return res.status(404).json({message: 'Unexpected error occurred.'})
            }
        }else{
            return res.status(404).json({message: 'Invalid product id.'})
        }
    }

    async remove(req, _res){
        const {id} = req.params
        return Product.findAll({where: {id}}).then(async (result) => { await Product.destroy({ where: { id } })})
    }

    async addDiscount(req, res){
        const {id, price} = req.body
        console.log(id)
        const device = await Product.findOne({where: {id}})
        device.discount = price
        device.save()
        return res.json(device)
    }

    async change(req, res){
        const {id} = req.params
        const {title, description, price, detailedDescription} = req.body
        const device = await Product.findOne({where: {id}})
        device.title = title
        device.description = description
        device.price = price
        device.detailedDescription = detailedDescription
        device.save()
        return res.json(device)
    }
}

module.exports = new ProductController()