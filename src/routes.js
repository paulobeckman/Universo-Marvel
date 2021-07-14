const express = require('express')
const routes = express.Router()

routes.use('/', function(req, res){
    return res.render('index')
})

module.exports = routes