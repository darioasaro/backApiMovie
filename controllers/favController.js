const daoFavMovie = require('../dao/favoritesDao.js')

exports.list = (req, res)=>{
    console.log(req.params.id);
    let id_user = req.params.id
    
    daoFavMovie.getFavMovies(id_user,(err,movies)=>{
        if (err) throw err;
        res.json({'movies': movies})
    })
}

exports.addFavMovie = (req, res)=>{
    let id_movi = req.params.idMovie
    let id_user = req.params.id
    daoFavMovie.addFavMovie(id_movi,id_user)
    res.json('se agrego correctamente!')
}
exports.deleteFavMovie = (req, res)=>{
    let id_movi = req.params.idMovie
    let id_user = req.params.id
    console.log(req.params);
    daoFavMovie.deleteFavMovies(id_movi,id_user)
    res.json('se quito exitosamete de la lsita de favoritos')
}