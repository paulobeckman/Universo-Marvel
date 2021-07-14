const express = require('express')
const routes = express.Router()

const Home = require('./app/controllers/HomeController')

routes.use('/', Home.index)

module.exports = routes