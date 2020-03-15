const daoUser = require("../dao/userDao.js");

exports.index = (req, res) => {
  daoUser.getAll((err, users) => {
    console.log("users", users);
    res.json({ users: users });
  });
};

exports.show = (req, res) => {
  let id = req.params.id;

  try {
    let user = daoUser.getUser(id);
    res.json({ user: user });
  } catch (e) {
    console.log(e);
  }
};

exports.edit = (req, res) => {
  let id = req.params.id;

  try {
    let user = daoUser.getUser(id);
    res.json({ user: user });
  } catch (e) {
    console.log(e);
  }
};

exports.update = (req, res) => {
  let { id, name, pass, active } = req.body;
  //agregar el updated at , fecha en que se lo modifica
  try {
    user = {
      id: id,
      name: name,
      pass: pass,
      active: active
    };
    daoUser.updateUser(user);
    res.json("Se edito correctamente el usuario");
  } catch (e) {
    console.log(e);
  }
};

exports.delete = (req, res) => {
  let id = req.params.id;

  try {
    daoUser.deleteUser(id);
    res.json("Se borro el usuario correctamente");
  } catch (e) {
    console.log(e);
  }
};
