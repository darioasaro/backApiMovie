const daoMovie = require('../dao/movieDao.js')
exports.index = (req, res )=>{
    let movies = daoMovie.getAll()
    res.json({'movies' : movies});
}

exports.store = (req, res)=>{
    const {id_api, original_title, backdrop_path, poster_path, overview, vote_average, vote_count} = req.body;
    const created = time();
    try{
        if(!isExistMovie(id_api)){
            movie = {
                id_api: id_api,
                original_title : original_title,
                backdrop_path : backdrop_path,
                poster_path : poster_path,
                overview : overview,
                vote_average : vote_average,
                vote_count : vote_count,
                created_at : created,
                updated_at : created
            }
            daoMovie.createMovie(movie)
            res.json('Se agregó correctamente la pelicula')
        }else{
            res.status(200).json('La pelicula ya existe!!')
        }
    }catch(e){
        console.log(e);
        
    }    

}
exports.edit= (res, req)=>{
    try{
        const movie = daoMovie.getMovie(req.params.id)
        res.json({'movie':movie})
    }catch (e){
        console.log(e);        
    }
}
exports.update = (res, req)=>{
    const {id_api, original_title, backdrop_path, poster_path, overview, vote_average, vote_count} = req.body;
    const update = time();
    try{
        movie = {
            id_api: id_api,
            original_title : original_title,
            backdrop_path : backdrop_path,
            poster_path : poster_path,
            overview : overview,
            vote_average : vote_average,
            vote_count : vote_count,
            updated_at : update
        }
        daoMovie.updateMovie(movie)
        res.json('Se editó correctamente la pelicula')
    }catch(e){
        console.log(e);
        
    }

}
exports.delete= (res,req)=>{
    const deleted_at = time()
    try{
        daoMovie.deleteMovie(req.params.id, deleted_at)
        res.json('Se elimino correcamente')
    }catch (e){
        console.log(e);        
    }
}

isExistMovie = (id_api)=>{
    let exist = false
    let movie = daoMovie.isExist(id_api)
    if(movie){
        exist = true
        return exist
    }else{
        return exist
    }
}

time =()=>{
    const hoy = new Date();
    var fecha = hoy.getFullYear() + '-'+ (hoy.getMonth()+1) +'-'+ hoy.getDate();
    var hora = hoy.getHours()+':'+ hoy.getMinutes()+':'+hoy.getSeconds();
    var created = fecha + ' ' + hora
    return created;
  }
