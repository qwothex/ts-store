const { DataTypes } = require('sequelize')
const sequelize = require('../db')

const User = sequelize.define( 'user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'},
    additional: {type: DataTypes.JSON}
})

const Product = sequelize.define( 'product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.JSON},
    price: {type: DataTypes.INTEGER, allowNull: false},
    image: {type: DataTypes.STRING},
    type: {type: DataTypes.STRING, allowNull: false},
    brand: {type: DataTypes.STRING, allowNull: false}
})

module.exports = {
    User,
    Product
}