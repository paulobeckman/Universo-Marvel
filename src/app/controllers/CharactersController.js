require('dotenv/config');
const { response } = require('express');
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

        const results = await api.get(`characters/${id}?limit=2&ts=1616200616&apikey=${APP_API_KEY}&hash=${APP_HASH}`)
        const {results: character } = results.data.data
        
        const comics = character[0].comics.items.map( async comic => {
            const comicId = comic.resourceURI.split('/').reverse()[0]
            const newComic = await api.get(`comics/${comicId}?limit=50&ts=1616200616&apikey=${APP_API_KEY}&hash=${APP_HASH}`)
            return newComic.data.data.results[0]
        })

        const result = await Promise.all(comics)

        // console.log(JSON.stringify(character[0], null, 2))
        console.log(JSON.stringify(result[0].title, null, 2))

        return res.render('Characters/show', {character:character[0], comics: result})
    }
}