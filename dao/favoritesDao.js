const db = require("../config/connection");
/**
 * getFavMovies();
 * addFavMovie();
 * deleteFavMovie();
 */

exports.getFavMovies = (id_user, callback) => {
  let idUser = id_user
  let movies;
  let sql = `SELECT m.*, u.userName, u.id as 'idUser'
             from movie_user mv
             inner join movies m
             on mv.id_movie = m.id
             inner join users u
             on mv.id_user = u.id 
             where u.id = ${idUser}`;
  db.connection.query(sql, (err, rows) => {
    if (err) {
      console.log("error", err);
      throw err;
    }
    movies = rows
    return callback(err, movies);
  });
};

exports.addFavMovie = (id_movie, id_user) => {
  
  let sql = `INSERT INTO movie_user (id_movie, id_user) VALUES (?,?)`;
  db.connection.query(
    sql,
    [
      id_movie,
      id_user
      
    ],
    (err, rows) => {
      if (err) throw err;
    }
  );
};

exports.deleteFavMovies = (id_movie, id_user) => {
  console.log('id_movieas', id_movie);  
  let sql = `delete from  movie_user  WHERE id_movie = (?) AND id_user = (?) `;
  db.connection.query(sql, [id_movie, id_user], (err, rows) => {
    if (err) throw err;
  });
};
