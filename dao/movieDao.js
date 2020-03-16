const db = require("../config/connection");
/**
 * getAll ();
 * getMovie();
 * isExist();
 * createMovie();
 * updateMovie();
 * deleteMovie();
 */

exports.getAll = callback => {
  let sql = "SELECT * FROM movies WHERE deleted_at IS null";
  let response;
  db.connection.query(sql, (err, rows) => {
    if (err) {

      console.log('error',err);
      throw err
    } 
    response =  rows
    return callback( err , response)
    

  });
};

exports.getMovie = (id, callback) => {

  let movie;
  let sql = `SELECT * FROM movies WHERE id = ${id} AND deleted_at IS null`;
  db.connection.query(sql, (err, rows) => {
    if (err) throw err;
    movie = rows
    return callback(err,movie);
  });
};

exports.isExist = (id_api,callback) => {
  
  let sql = `SELECT * FROM movies WHERE id_api = '${id_api}' AND deleted_at IS null`;
  console.log('sql',sql);
  let response;
  
  db.connection.query(sql, (err, rows) => {
    if (err) {
      console.log('err',err);
      err
    };
    response =  rows    
    return callback(err, response)
  });
};

exports.createMovie = movie => {
    let  {

    id_api,
    original_title,
    backdrop_path,
    poster_path,
    overview,
    vote_average,
    vote_count,
    created_at,
    deleted_at,
    updated_at
  } = movie;
  let sql = `INSERT INTO movies (id_api, original_title, backdrop_path, poster_path, overview, vote_average, vote_count, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?)`;
  db.connection.query(
    sql,
    [
      id_api,
      original_title,
      backdrop_path,
      poster_path,
      overview,
      vote_average,
      vote_count,
      created_at,
      updated_at
    ],
    function(err, rows) {
      if (err) throw err;

    }
  );
};


exports.updateMovie = (movie, id) => { 
  let sql = `UPDATE movies SET original_title = (?), backdrop_path =(?), poster_path = (?), overview= (?), vote_average = (?), vote_count = (?), updated_at = (?) WHERE id = ${id} AND deleted_at IS null`;

  db.connection.query(
    sql,
    [
      original_title= movie.original_title,
      backrop_path = movie.backdrop_path,
      poster_path= movie.poster_path,
      overview = movie.overview,
      vote_average = movie.vote_average,
      vote_count = movie.vote_count,
      updated_at= movie.updated_at
    ],
    function(err, rows) {
      if (err) throw err;


    }
  );
};


exports.deleteMovie = (id, deletedTime) => {
  let sql = `UPDATE movies SET deleted_at = '${deletedTime}'  WHERE id = ${id} AND deleted_at IS null`;
  db.connection.query(sql, (err, rows) => {
    if (err) throw err;
    //res.json({ movies: rows });

  });
};
