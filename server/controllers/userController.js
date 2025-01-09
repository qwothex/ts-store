const jwt = require('jsonwebtoken')
const {User} = require('../models/models')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const path = require('path')
const ApiError = require('../error/ApiError')

const generateJwt = (id, username, role, additional, lastview, cart) => {
    return jwt.sign(
        {id, username, role, additional, lastview, cart},
         process.env.SECRET_KEY,
         {expiresIn: '72h'}
    )
}

class UserController {
    async registration(req, res, next) {
        try{
        const {username, password, role} = req.body 
        if(!username || !password){
            return next(ApiError.badRequest('wrong username or password'))
        }
        const candidate = await User.findOne({where:{username}})
        if(candidate){
            return next(ApiError.badRequest('username alredy registered'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({username, role, password: hashPassword, additional: {'image':'Default_pfp.png'}})
        const token = generateJwt(user.id, user.username, user.role, user.additional)
        res.json({token})
        }catch(e){
            return next(ApiError.internal('something wrong!'))
        }
    }
    async login(req, res, next) {
        const {username, password} = req.body
        const user = await User.findOne({where:{username}})
        if(!user){
            return next(ApiError.internal('user not found'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword){
            return next(ApiError.internal('wrong password'))
        }
        const token = generateJwt(user.id, user.username, user.role, user.additional, user.lastview, user.cart)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.username, req.user.role, req.user.additional, req.user.lastview, req.user.cart)
        if(!token){
            return null
        }
        return res.json({token})
    }

    async additional(req, res, next) {
        const {id, name, bio, location, telegram, image} = req.body

        let fileName;
        if(image) fileName = image

        else{
            const {image} = req.files;
        
            fileName = uuid.v4() + '.jpg'
            image.mv(path.resolve(__dirname, '..', 'static', fileName))
        }
 
        const user = await User.findOne({where:{id}})
        await user.update({additional: {name, bio, location, telegram, image: fileName}})
        await user.save()
        const token = generateJwt(user.id, user.username, user.role, user.additional, user.lastview, user.cart)
        return res.json({token})
    }

    async lastview(req, res, next) {
        const {id, productId} = req.body
        const user = await User.findOne({where:{id}})
        let isExist = false;
        const length = user.lastview.length
        user.lastview.forEach((el) => { if(el == productId) isExist = true })
        if(!isExist) {
            user.lastview.push(productId)
            if(length >= 15) user.lastview.pop()
        }
        user.changed('lastview', true)
        await user.save()
        const token = generateJwt(user.id, user.username, user.role, user.additional, user.lastview, user.cart)
        return res.json({token})
    }

    async addCart(req, res, next) {
        const {id, productId, RAMvolume, RAMprice} = req.body
        const user = await User.findOne({where:{id}})
        let isExist = false;
        user.cart.forEach((el) => { if(el.id == productId) isExist = true })
        if(!isExist){user.cart.unshift({id: productId, RAMvolume: RAMvolume, RAMprice: RAMprice})}
        user.changed('cart', true)
        await user.save()
        const token = generateJwt(user.id, user.username, user.role, user.additional, user.lastview, user.cart)
        return res.json({token})
    }

    async deleteFromCart(req, res, next) {
        const {productId, id} = req.body
        const user = await User.findOne({where:{id}})
        user.cart = user.cart.filter(el => el.id !== productId)
        user.changed('cart', true)
        await user.save()
        const token = generateJwt(user.id, user.username, user.role, user.additional, user.lastview, user.cart)
        return res.json({token})
    }

    async truncateCart(req, res, next) {
        const {id} = req.query
        const user = await User.findOne({where:{id}})
        user.cart = []
        user.changed('cart', true)
        await user.save()
        const token = generateJwt(user.id, user.username, user.role, user.additional, user.lastview, user.cart)
        return res.json({token})
    }
}
module.exports = new UserController()