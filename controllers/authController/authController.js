const userDao = require("../../dao/userDao");
const crypto = require("crypto");
const rediService = require('../../services/redis')



//Gestion de login,encripta password con crypto y compara con el almacenado en la BD
exports.login = (req, res) => {
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
        const us = rows[0]
        const usRed = {
          userName : us.userName,
          password : us.password,
          id_role : us.id_role
        }
        
        const tk = generateToken()
        rediService.insert(tk,JSON.stringify(usRed),(err,result)=>{
          if (err) res.status(500).send('Internal Error')
          else{  
          res.json({ result: true,'message':"login ok",token:tk,rol:us.id_role,id:us.id});
          }
          
        })
      }
    });
  } else {
    res.status(400).json({ result:false,'message': "Bad request" });
  }

};

generateToken = (size = 10) => {
  let text = '';
  let possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < size; i++) {
      text += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
  }
  return text;
};

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
        res.status(201).json({ result: "ok",user:username,id:rows.insertId});
        
         });
  }
};