/**
 * getAll();
 * createUser();
 * getUser();
 * updateUser();
 * deleteUser();
 */

const db = require("../config/connection");

exports.getAll = callback => {
  let sql = "SELECT * FROM users WHERE deleted_at IS NULL ";
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
  let sql = `SELECT * FROM users WHERE id = ${id} AND deleted_at IS NULL`;
  let response;
  db.connection.query(sql, (err, rows) => {
    if (err) throw err;

    response = rows;
    return callback(err, response);
  });
};

exports.isExist = (id, callback) => {
  let sql = `SELECT * FROM users WHERE id = ${id} AND deleted_at IS NULL`;
  db.connection.query(sql, (err, rows) => {
    if (err) throw err;

    return callback(err, rows);
  });
};

exports.updateUser = (user, callback) => {  
  let {id, name, password, created_at, updated_at,deleted_at, id_role } = user;
  console.log('userDao',user.name,user.password);
  
  let sql = `UPDATE users SET name = ? , password = ?  WHERE id = ? AND deleted_at IS NULL`;
  db.connection.query(
    sql,
    [name,password,id ],
    (err, rows) => {
      if (err) throw err;
      return callback(err, rows);
    }
  );
};

exports.deleteUser = (user, callback) => {
  let{id,name,password,created_at,updated_at,deleted_at,id_role} = user;
   
  let currentTime = time();
  let sql = `UPDATE users SET deleted_at = ?  WHERE id = ? AND deleted_at IS NULL`;
  db.connection.query(sql,[currentTime,id], (err, rows) => {
    if (err) throw err;
    return callback(err, rows);
  });
};


let time = () => {
  let today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var hour =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var created = date + " " + hour;
  return created;
};
