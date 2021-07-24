const express = require('express')
const routes = express.Router()

const Home = require('./app/controllers/HomeController')

routes.get('/', function(req, res){
    return res.redirect("/home")
})

routes.use('/home', Home.index)

module.exports = routes