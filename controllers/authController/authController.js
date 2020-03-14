var userDao = require("../../dao/userDao");
var crypto = require("crypto");

exports.login = (req, res) => {
  var username = req.body.user;
  var password = req.body.pass;
};

//----Crea el usuario en la base de datos con la contraseña encriptada
exports.register = (req, res) => {
  const username = req.body.name;
  const password = req.body.pass;
  const rol = 1

  if (username && password && rol) {
    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");
    const user = { name: username, pass: hashedPassword , role:rol};
    userDao.addUser(user, (err, rows) => {
      if (err) throw err
         });
    res.json({ result: "ok" });
  }
  else{
  res.status(400).json({'result':'bad data'})
  }
};
