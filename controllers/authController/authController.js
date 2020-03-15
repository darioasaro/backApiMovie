var userDao = require("../../dao/userDao");
var crypto = require("crypto");


exports.login = (req, res) => {
  var username = req.body.user;
  var password = req.body.pass;
  let hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
      userDao.getUserLogin()

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
    const user = { userName: username, password: hashedPassword , id_rol:rol};
    userDao.createUser(user, (err, rows) => {
      if (err) {
        res.status(500).json({'result':'Internal error'})
      }
        res.json({ result: "ok" });
      
         });
  }
  else{
  res.status(400).json({'result':'bad data'})
  }
};
