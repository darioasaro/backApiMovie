const mysql = require("mysql");

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER  || 'root',
  password: process.env.DB_PASSWORD  || "",
  database: process.env.DB_NAME || "apibackmovie"
});

connection.connect(err => {
  if (err) {
    console.log("Error connecting to Db" + err);
    return;
  }
  console.log("Connection established");
});

exports.connection = connection;
