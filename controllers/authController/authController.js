const userDao = require("../../dao/userDao");
const crypto = require("crypto");
const jwt =  require ('jsonwebtoken')
const secret = 'mysecretsshhh';
const rediService = require('../../services/redis')



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
        console.log('rows',rows[0])
        const u = {
          username: rows[0].username,
          id_role : rows[0].id_role
        }
        const tk = generateToken(u)
        rediService.insert('token',tk,(err,result)=>{
            console.log('resultado agregar redis',result)
        })
        res.json({ result: true,'message':"login ok",token:tk,rol:rows[0].id_role,id:rows[0].id});
      }
    });
  } else {
    res.status(400).json({ result:false,'message': "Bad request" });
  }

};

const generateToken = (user) =>{
  var u = {
   username: user.username,
   id_role : user.id_role
  }
  return token = jwt.sign(u, secret, {
     expiresIn: 60 * 60 * 24 // expira in 24 hours
  })
}

//----Crea el usuario en la base de datos con la contraseña encriptada
exports.register = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const id_role = req.body.id_role 
 

  if (username && password && id_role) {
    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    const user = { userName: username, password: hashedPassword, id_role };
    userDao.createUser(user, (err, rows) => {
      if (err) {
        res.status(500).json({'result':'Internal error'})
      }
        res.json({ result: "ok" });
      
         });
  }
};