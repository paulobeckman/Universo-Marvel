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

        const creators = serie.creators.items.map( async creator => {
            const creatorId = creator.resourceURI.split('/').reverse()[0]
            const newCreator = await api.get(`creators/${creatorId}?limit=50&ts=1616200616&apikey=${APP_API_KEY}&hash=${APP_HASH}`)
            return newCreator.data.data.results[0]
        })
        const resultCreators = await Promise.all(creators)

        const comics = serie.comics.items.map( async comic => {
            const comicId = comic.resourceURI.split('/').reverse()[0]
            const newComic = await api.get(`comics/${comicId}?limit=50&ts=1616200616&apikey=${APP_API_KEY}&hash=${APP_HASH}`)
            return newComic.data.data.results[0]
        })
        const resultComics = await Promise.all(comics)

        return res.render('Series/show', {serie, creators: resultCreators, comics: resultComics})
    }

}