const express = require('express')
const routes = express.Router()

const Home = require('./app/controllers/HomeController')
const Characters = require('./app/controllers/CharactersController')
const Comics = require('./app/controllers/ComicsController')
const Series = require('./app/controllers/SeriesController')

routes.get('/', function(req, res){
    return res.redirect("/home")
})

routes.use('/home', Home.index)
routes.use('/characters', Characters.index)
routes.use('/comics', Comics.index)
routes.use('/series', Series.index)

module.exports = routes