const db = require("../config/connection");
/**
 * getAll ();
 * getMovie();
 * isExist();
 * createMovie();
 * updateMovie();
 * deleteMovie();
 */

exports.getAll = () => {
  let sql = "SELECT * FROM movies WHERE deleted_at IS null";
  db.connection.query(sql, (err, rows) => {
    if (err) throw err;
    res.json({ movies: rows });
  });
};

exports.getMovie = id => {
  let sql = `SELECT * FROM movies WHERE id = ${id} AND deleted_at IS null`;
  db.connection.query(sql, (err, rows) => {
    if (err) throw err;
    res.json({ movies: rows });
  });
};

exports.isExist = id_api => {
  let sql = `SELECT * FROM movies WHERE id_api = ${id_api} AND deleted_at IS null`;
  db.connection.query(sql, (err, rows) => {
    if (err) throw err;
    res.json({ movies: rows });
  });
};

exports.createMovie = movie => {
  const movie = {
    id_api,
    original_title,
    backrop_path,
    poster_path,
    overview,
    vote_average,
    vote_count,
    created_at,
    deleted_at,
    updated_at
  };
  let sql = `INSERT INTO movies (id_api, original_title, backrop_path, poster_path, overview, vote_average, vote_count, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?)`;
  db.connection.query(
    sql,
    [
      id_api,
      original_title,
      backrop_path,
      poster_path,
      overview,
      vote_average,
      vote_count,
      created_at,
      updated_at
    ],
    function(err, rows) {
      if (err) throw err;
      es.json({ movies: rows });
    }
  );
};

exports.updateMovie = id => {
  const {
    original_title,
    backrop_path,
    poster_path,
    overview,
    vote_average,
    vote_count,
    created_at,
    updated_at
  } = movie;
  let sql = `UPDATE movies SET original_title = (?), backrop_path =(?), poster_path = (?), overview (?), vote_average = (?), vote_count = (?), created_at = (?), updated_at = (?) WHERE id = ${id} AND deleted_at IS null`;
  db.connection.query(
    sql,
    [
      original_title,
      backrop_path,
      poster_path,
      overview,
      vote_average,
      vote_count,
      created_at,
      updated_at
    ],
    function(err, rows) {
      if (err) throw err;
      es.json({ movies: rows });
    }
  );
};

exports.deleteMovie = (id, deletedTime) => {
  let sql = `UPDATE movies SET deleted_ad = ${deletedTime}  WHERE id = ${id} AND deleted_at IS null`;
  db.connection.query(sql, (err, rows) => {
    if (err) throw err;
    res.json({ movies: rows });
  });
};
