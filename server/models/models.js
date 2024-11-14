const { DataTypes } = require('sequelize')
const sequelize = require('../db')

const User = sequelize.define( 'user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'},
    additional: {type: DataTypes.JSON},
    lastview: {type: DataTypes.JSON, allowNull: true, defaultValue: []},
    cart: {type: DataTypes.JSON, allowNull: true, defaultValue: []},
})

const Product = sequelize.define( 'product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.JSON},
    price: {type: DataTypes.INTEGER, allowNull: false},
    image: {type: DataTypes.STRING},
    type: {type: DataTypes.STRING, allowNull: false},
    brand: {type: DataTypes.STRING, allowNull: false},
    memory: {type: DataTypes.JSON, allowNull: true},
    discount: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: true},
    detailedDescription: {type: DataTypes.JSON, allowNull: true}
})

const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    products: {type: DataTypes.JSON, allowNull: false},
    total: {type: DataTypes.INTEGER, allowNull: false},
    userId: {type: DataTypes.INTEGER, allowNull: false},
    status: {type: DataTypes.STRING, allowNull: false, defaultValue: 'in progress'}
})

module.exports = {
    User,
    Product,
    Order
}