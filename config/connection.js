const mysql = require("mysql");

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "user",
  database: process.env.DB_NAME
});

connection.connect(err => {
  if (err) {
    console.log("Error connecting to Db" + err);
    return;
  }
  console.log("Connection established");
});

exports.connection = connection;
