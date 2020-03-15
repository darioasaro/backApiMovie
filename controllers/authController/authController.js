var userDao = require("../../dao/userDao");
var crypto = require("crypto");

exports.login = (req, res) => {
  var username = req.body.user;
  var password = req.body.pass;

  if (username && password) {
    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");
    userDao.getUserByNamePass(username, hashedPassword, (err, rows) => {
      if (err) {
        res.status(500).json({ result: "Internal Server Error" });
      }
      if (!rows.length) {
        res
          .status(403)
          .json({ result: false, message: "Error Login,try again" });
      } else {
        res.json({ result: "login ok" });
      }
    });
  } else {
    res.status(400).json({ result: "Bad request" });
  }
};

//----Crea el usuario en la base de datos con la contraseña encriptada
exports.register = (req, res) => {
  const username = req.body.name;
  const password = req.body.pass;
  const rol = 1;

  if (username && password && rol) {
    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");
    const user = { userName: username, password: hashedPassword, id_rol: rol };
    userDao.createUser(user, (err, rows) => {
      if (err) throw err;
    });
    res.json({ result: "ok" });
  } else {
    res.status(400).json({ result: "bad data" });
  }
};
