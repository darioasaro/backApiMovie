/**
 * getAll();
 * createUser();
 * getUser();
 * updateUser();
 * deleteUser();
 */

const db = require("../config/connection");

exports.getAll = callback => {
  let sql = "SELECT * FROM users AND deleted_at IS null ";
  let response;
  db.connection.query(sql, (err, rows) => {
    if (err) {
      console.log("error", err);

      throw err;
    }

    response = rows;

    return callback(err, response);
  });
};

exports.createUser = (user, callback) => {
  let { userName, password, created_at, updated_at, id_rol } = user;
  let sql = `INSERT INTO users (userName, password, created_at, updated_at, id_role) VALUES (?, ?, ?, ?, ?)`;
  db.connection.query(
    sql,
    [userName, password, created_at, updated_at, id_rol],
    (err, rows) => {
      if (err) throw err;
      return callback(err, rows);
    }
  );
};

exports.getUser = (id, callback) => {
  let sql = `SELECT * FROM users WHERE id = ${id} AND deleted_at IS null`;
  db.connection.query(sql, (err, rows) => {
    if (err) throw err;
    return callback(err, rows);
  });
};

exports.isExist = (id, callback) => {
  let sql = `SELECT * FROM users WHERE id = ${id} AND deleted_at IS null`;
  db.connection.query(sql, (err, rows) => {
    if (err) throw err;
    return callback(err, rows);
  });
};

exports.updateUser = (id, callback) => {
  let { userName, password, created_at, updated_at, id_role } = user;
  let sql = `UPDATE users SET userName = (?), password = (?), created_at = (?), updated_at = (?), id_role = (?) WHERE ${id} AND deleted_at IS null`;
  db.connection.query(
    sql,
    [userName, password, created_at, updated_at, id_role],
    (err, rows) => {
      if (err) throw err;
      return callback(err, rows);
    }
  );
};

exports.deleteUser = (id, callback) => {
  let sql = `UPDATE users SET deleted_ad = ${deletedTime}  WHERE id = ${id} AND deleted_at IS null`;
  db.connection.query(sql, (err, rows) => {
    if (err) throw err;
    return callback(err, rows);
  });
};
