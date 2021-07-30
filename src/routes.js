const express = require('express')
const routes = express.Router()

const Home = require('./app/controllers/HomeController')
const Characters = require('./app/controllers/CharactersController')
const Comics = require('./app/controllers/ComicsController')
const Series = require('./app/controllers/SeriesController')

routes.get('/', function(req, res){
    return res.redirect("/home")
})

routes.get('/home', Home.index)

routes.get('/characters', Characters.index)
routes.get('/characters/:id', Characters.show)

routes.get('/comics', Comics.index)
routes.get('/comics/:id', Comics.show)

routes.get('/series', Series.index)
routes.get('/series/:id', Series.show)

module.exports = routes