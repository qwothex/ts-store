const jwt = require('jsonwebtoken')
const {User, Product} = require('../models/models')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const path = require('path')
const ApiError = require('../error/ApiError')

const generateJwt = (id, username, role, additional, lastview) => {
    return jwt.sign(
        {id, username, role, additional, lastview},
         process.env.SECRET_KEY,
         {expiresIn: '72h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {username, password, role} = req.body 
        if(!username || !password){
            return next(ApiError.badRequest('wrong username or password'))
        }
        const candidate = await User.findOne({where:{username}})
        if(candidate){
            return next(ApiError.badRequest('username alredy registered'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({username, role, password: hashPassword})
        const token = generateJwt(user.id, user.username, user.role)
        res.json({token})
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
        const token = generateJwt(user.id, user.username, user.role, user.additional, user.lastview)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.username, req.user.role, req.user.additional, req.user.lastview)
        return res.json({token})
    }

    async additional(req, res, next) {
        const {id, name, bio, location, telegram} = req.body

        const {image} = req.files

        console.log(image)
        
        let fileName = uuid.v4() + '.jpg'
        image.mv(path.resolve(__dirname, '..', 'static', fileName))
 
        const user = await User.findOne({where:{id}})
        await user.update({additional: {name, bio, location, telegram, image: fileName}})
        await user.save()
        const token = generateJwt(user.id, user.username, user.role, user.additional, user.lastview)
        return res.json({token})
    }

    async lastview(req, res, next) {
        const {id, product} = req.body
        const user = await User.findOne({where:{id}})
        let isExist = false;
        user.lastview.forEach((el) => {if(el.id == product.id) isExist = true})
        if(!isExist){user.lastview.unshift(product)}
        user.changed('lastview', true)
        await user.save()
        const token = generateJwt(user.id, user.username, user.role, user.additional, user.lastview)
        return res.json({token})
    }
}
module.exports = new UserController()