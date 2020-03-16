const db = require("../config/connection");

exports.getAll = callback => {
  let sql = "SELECT * FROM genres WHERE deleted_at IS null";
  db.connection.query(sql, (err, rows) => {
    if (err) throw err;
    return callback(err, rows);
  });
};

exports.inserAlltGenres = (genres, callback) => {
  db.query(
    `INSERT INTO genres (name, created_at, updated_at) VALUES ?`,
    [genres.map(genre => [genre.name, genre.created_at, genre.updated_at])],
    (err, rows) => {
      if (err) throw err;
      return callback(err, rows);
    }
  );
};
