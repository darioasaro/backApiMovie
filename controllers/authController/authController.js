var userDao = require("../../dao/userDao");
var crypto = require("crypto");



//Gestion de login,encripta password con crypto y compara con el almacenado en la BD
exports.login = (req, res) => {
  console.log(req.body)
  var username = req.body.username;
  var password = req.body.password;

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
        res.json({ result: true,'message':"login ok",rol:2});
      }
    });
  } else {
    res.status(400).json({ result:false,'message': "Bad request" });
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
      if (err) {
        res.status(500).json({'result':'Internal error'})
      }
        res.json({ result: "ok" });
      
         });
  }
};