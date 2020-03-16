const db = require("../config/connection");
/**
 * getFavMovies();
 * addFavMovie();
 * deleteFavMovie();
 */

exports.getFavMovies = callback => {
  let sql = "SELECT * FROM movies WHERE deleted_at IS null";
  db.connection.query(sql, (err, rows) => {
    if (err) {
      console.log("error", err);
      throw err;
    }
    return callback(err, rows);
  });
};

exports.addFavMovie = movie => {
  let {
    id_api,
    original_title,
    backdrop_path,
    poster_path,
    overview,
    vote_average,
    vote_count,
    created_at,
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
    (err, rows) => {
      if (err) throw err;
    }
  );
};

exports.deleteFavMovie = (id, deletedTime) => {
  let sql = `UPDATE movies SET deleted_at = (?) WHERE id = (?) AND deleted_at IS null`;
  db.connection.query(sql, [deletedTime, id], (err, rows) => {
    if (err) throw err;
  });
};
