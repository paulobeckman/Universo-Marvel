require('dotenv/config');
const api = require('../../services/api')

module.exports = {
    async index(req, res){
        const { APP_API_KEY, APP_HASH } = process.env

        const series = await api.get(`series?limit=50&ts=1616200616&apikey=${APP_API_KEY}&hash=${APP_HASH}`)
            .then( response => {
                return response.data.data.results
            });

        return res.render('Series/index', {series})
    },
    async show(req, res){
        const { APP_API_KEY, APP_HASH } = process.env
        const { id } = req.params

        const response = await api.get(`series/${id}?limit=2&ts=1616200616&apikey=${APP_API_KEY}&hash=${APP_HASH}`)
        const serie = response.data.data.results[0]

        console.log(JSON.stringify(serie, null, 2))

        return res.render('Series/show', {serie})
    }

}