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

        const response = await api.get(`comics/${id}?limit=2&ts=1616200616&apikey=${APP_API_KEY}&hash=${APP_HASH}`)
        const comic = response.data.data.results[0]

        const creators = comic.creators.items.map( async creator => {
            const creatorId = creator.resourceURI.split('/').reverse()[0]
            const newCreator = await api.get(`creators/${creatorId}?limit=50&ts=1616200616&apikey=${APP_API_KEY}&hash=${APP_HASH}`)
            return newCreator.data.data.results[0]
        })
        const resultCreators = await Promise.all(creators)

        const serieId = comic.series.resourceURI.split('/').reverse()[0]
        const newSerie = await api.get(`series/${serieId}?limit=50&ts=1616200616&apikey=${APP_API_KEY}&hash=${APP_HASH}`)
        const resultSeries = newSerie.data.data.results[0]

        return res.render('Comics/show', {comic, creators: resultCreators, serie: resultSeries})
    }
}