const daoFavMovie = require('../dao/favMovieDao.js')

exports.list = (req, res)=>{
    let id_movi = req.params.id_movi
    let id_user = req.params.id_user
    daoFavMovie.getFavMovies((id_movi,id_user, movies)=>{
        res.json({'movies': movies})
    })
}

exports.addFavMovie = (req, res)=>{
    let id_movi = req.params.id_movi
    let id_user = req.params.id_user
    let created = time();
    let fav = {
        id_movi,id_user, created
    }
    daoFavMovie.store(fav)
    res.json('se agrego correctamente!')
}
exports.deleteFavMovie = (req, res)=>{
    let id_movi = req.params.id_movi
    let id_user = req.params.id_user
    let created = time();
    let fav = {
        id_movi,id_user, created
    }
    daoFavMovie.deleteFavMovies(()=>{
        res.json({'movies': movies})
    })
}