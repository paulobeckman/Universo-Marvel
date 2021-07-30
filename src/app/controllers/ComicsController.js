require('dotenv/config');
const api = require('../../services/api')

module.exports = {
    async index(req, res){
        const { APP_API_KEY, APP_HASH } = process.env

        const comics = await api.get(`comics?limit=50&ts=1616200616&apikey=${APP_API_KEY}&hash=${APP_HASH}`)
            .then( response => {
                return response.data.data.results
            });

        return res.render('Comics/index', {comics})
    },
    async show(req, res){
        const { APP_API_KEY, APP_HASH } = process.env
        const { id } = req.params

        const comic = await api.get(`comics/${id}?limit=2&ts=1616200616&apikey=${APP_API_KEY}&hash=${APP_HASH}`)
            .then(response => {
                return response.data.data.results
            });

        return res.render('Comics/show', {comic})
    }
}