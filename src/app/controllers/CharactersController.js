require('dotenv/config');
const api = require('../../services/api')

module.exports = {
    async index(req, res){
        const { APP_API_KEY, APP_HASH } = process.env

        const characters = await api.get(`characters?limit=50&ts=1616200616&apikey=${APP_API_KEY}&hash=${APP_HASH}`)
            .then(response => {
                return response.data.data.results
            });

        return res.render('Characters/index', {characters})
    },
    async show(req, res){
        const { APP_API_KEY, APP_HASH } = process.env
        const { id } = req.params

        const character = await api.get(`characters/${id}?limit=2&ts=1616200616&apikey=${APP_API_KEY}&hash=${APP_HASH}`)
            .then(response => {
                return response.data.data.results[0]
            });

        return res.render('Characters/show', {character})
    }
}