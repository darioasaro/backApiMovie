/**
 * getAll();
 * createUser();
 * getUser();
 * isExist();
 * updateUser();
 * deleteUser();
 * getUserByNamePass();
 */

const db = require("../config/connection");

exports.getAll = callback => {
  let sql = "SELECT * FROM users WHERE deleted_at IS null";
  db.connection.query(sql, (err, rows) => {
    if (err) throw err;
    return callback(err, rows);
  });
};

exports.createUser = user => {
  let { userName, password, created_at, updated_at, id_rol } = user;
  let sql = `INSERT INTO users ( userName,password, created_at, updated_at, id_role) VALUES (?, ?, ?, ?, ?)`;
  db.connection.query(
    sql,
    [userName, password, created_at, updated_at, id_rol],
    (err, rows) => {
      if (err) throw err;
    }
  );
};

exports.getUser = (id, callback) => {
  let sql = `SELECT * FROM users WHERE id = (?) AND deleted_at IS null`;
  db.connection.query(sql, [id], (err, rows) => {
    if (err) throw err;
    return callback(err, rows);
  });
};

exports.isExist = (id, callback) => {
  let sql = `SELECT * FROM users WHERE id = (?) AND deleted_at IS null`;
  db.connection.query(sql, [id], (err, rows) => {
    if (err) throw err;
    return callback(err, rows);
  });
};

exports.updateUser = id => {
  let { userName, password, created_at, updated_at, id_role } = user;
  let sql = `UPDATE users SET userName = (?), password = (?), created_at = (?), updated_at = (?), id_role = (?) WHERE id = (?) AND deleted_at IS null`;
  db.connection.query(
    sql,
    [userName, password, created_at, updated_at, id_role, id],
    (err, rows) => {
      if (err) throw err;
    }
  );
};

exports.deleteUser = (id, deletedTime) => {
  let sql = `UPDATE users SET deleted_ad = (?) WHERE id = (?) AND deleted_at IS null`;
  db.connection.query(sql, [deletedTime, id], (err, rows) => {
    if (err) throw err;
  });
};

exports.getUserByNamePass = (userName, password, callback) => {
  let sql = `SELECT * FROM users WHERE userName = (?) AND password = (?)`;
  db.connection.query(sql, [userName, password], (err, rows) => {
    if (err) throw err;
    return callback(err, rows);
  });
};
