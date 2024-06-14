require('dotenv').config()
const express = require('express')
const router = require('./routes/index')
const PORT = process.env.PORT
const cors = require('cors')
const sequelize = require('./db')


const app = express()
app.use(cors())
app.use(express.json())

app.use('/api', router)

const start = async() => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    }catch (e){
        console.log(e)
    }
}

start()