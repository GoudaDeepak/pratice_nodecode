const express = require('express')
const bodyParser = require('body-parser')
const { Sequelize, DataTypes } = require('sequelize')
const app = express()



app.use(bodyParser.urlencoded({ extended: true, limit: '100mb', parameterLimit: 2000 }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));
const userRoute = require('./Routes/UserRoutes')
app.use('/api/user', userRoute)


app.get('/', async (req, res) => {
    res.status(200).json({ mess: 'Everything is fine' })
})
app.use('/', async (req, res) => {
    res.status(500).send('Page not found')
})


app.listen(5000, console.log('app is running'))