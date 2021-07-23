const api = require('../../services/api')
require('dotenv/config');

module.exports = {
    async index(req, res){
        const { APP_API_KEY, APP_HASH } = process.env

        const characters = await api.get(`characters?limit=2&ts=1616200616&apikey=${APP_API_KEY}&hash=${APP_HASH}`)
            .then(response => {
                return response.data.data.results
            });

        const comics = await api.get(`comics?limit=2&ts=1616200616&apikey=${APP_API_KEY}&hash=${APP_HASH}`)
            .then( response => {
                return response.data.data.results
            });

        const series = await api.get(`series?limit=4&ts=1616200616&apikey=${APP_API_KEY}&hash=${APP_HASH}`)
            .then( response => {
                return response.data.data.results
            });

        return res.render('home/index', {characters, comics, series})
    }
}