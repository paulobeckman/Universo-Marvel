require('dotenv/config');
const api = require('../../services/api')

module.exports = {
    async index(req, res){
        const { APP_API_KEY, APP_HASH } = process.env

        const series = await api.get(`series?limit=50&ts=1616200616&apikey=${APP_API_KEY}&hash=${APP_HASH}`)
            .then( response => {
                return response.data.data.results
            });

        return res.render('Series', {series})
    }
}