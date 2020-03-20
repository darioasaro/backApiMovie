const daoMovie = require("../dao/movieDao.js");
const service = require('../services/movies')
exports.index = (req, res) => {
  daoMovie.getAll((err, movies) => {
    res.json({ movies: movies });
  });
};

exports.store = (req, res) => {
  console.log('body movie',req.body);
  
  let {
    id_api,
    original_title,
    backdrop_path,
    poster_path,
    overview,
    vote_average,
    vote_count
  } = req.body;
  let created = time();
  try {
    if (!isExistMovie(id_api)) {
      movie1 = {
        id_api: id_api,
        original_title: original_title,
        backdrop_path: backdrop_path,
        poster_path: poster_path,
        overview: overview,
        vote_average: vote_average,
        vote_count: vote_count,
        created_at: created,
        updated_at: created
      };
      daoMovie.createMovie(movie1,req.body.genre );
      res.json("Se agregó correctamente la pelicula");
    } else {
      res.status(200).json("La pelicula ya existe!!");
    }
  } catch (e) {
    console.log(e);
  }
};
exports.edit = async (req, res) => {
     
    const mov =  await service.findMovie(req.params.id)
    let created = time();
    if(mov){ 
     const addMov = {
      id_api: mov.id,
      original_title: mov.original_title,
      backdrop_path: mov.backdrop_path,
      poster_path: mov.poster_path,
      overview: mov.overview,
      vote_average: mov.vote_average,
      vote_count: mov.vote_count,
      created_at: created,
      updated_at: created
      }
      
      daoMovie.createMovie(addMov,mov.genres );
      res.status(200).json({result:'ok',message:'Pelicula agregada'})
    }
    else {res.status(500).send('Internal Server Error')}
    
};
exports.update = (req, res) => {
  let {
    id_api,
    original_title,
    backdrop_path,
    poster_path,
    overview,
    vote_average,
    vote_count
  } = req.body;
  let update = time();
  try {
    movie = {
      id_api: id_api,
      original_title: original_title,
      backdrop_path: backdrop_path,
      poster_path: poster_path,
      overview: overview,
      vote_average: vote_average,
      vote_count: vote_count,
      updated_at: update
    };
    daoMovie.updateMovie(movie, req.params.id);
    res.json("Se editó correctamente la pelicula");
  } catch (e) {
    console.log(e);
  }
};
exports.delete = (req, res) => {
  let deleted_at = time();
  try {
    daoMovie.deleteMovie(req.params.id, deleted_at);
    res.json("Se elimino correcamente");
  } catch (e) {
    console.log(e);
  }
};

isExistMovie = (id_api, res) => {
  let exist = false;
  let movie;
  daoMovie.isExist(id_api, (err, cb) => {
    if (err) {
      res.status(500).json({ result: false, menssage: "internal error" });
    } else {
      movie = cb;
    }
  });
  if (movie) {
    exist = true;
    return exist;
  } else {
    return exist;
  }
};

time = () => {
  let hoy = new Date();
  var fecha =
    hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate();
  var hora = hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
  var created = fecha + " " + hora;
  return created;
};

exports.search = async (req,res)=>{
    const movie=req.params.movie
    
    if(movie){
    
      const data = await service.searchMovies(movie)
      if(!data){
        res.status(500).json({result:false,message:'Internal Error'})
      }
      if(data.results.length<0){
        res.status(404).json({results:false,message:'movie not fund'})
      }
      else{
        res.json({results:data.results})
      }
  }
}