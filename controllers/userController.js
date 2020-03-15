const daoUser = require("../dao/userDao.js");

isExistUser = id => {
  let exist = false;
  let user = daoUser.isExist(id);
  if (user) {
    exist = true;
    return exist;
  } else {
    return exist;
  }
};

exports.index = (req, res) => {
  daoUser.getAll((err, users) => {
    console.log("users", users);
    res.json({ users: users });
  });
};

exports.show = (req, res) => {
  let id = req.params.id;

  try {
    if (isExistUser(id)) {
      let user = daoUser.getUser(id);
      res.json({ user: user });
    } else {
      res.status(400).json("Usuario no encontrado");
    }
  } catch (e) {
    console.log(e);
  }
};

exports.edit = (req, res) => {
  let id = req.params.id;

  try {
    if (isExistUser(id)) {
      let user = daoUser.getUser(id);
      res.json({ user: user });
    } else {
      res.status(400).json("Usuario no econtrado");
    }
  } catch (e) {
    console.log(e);
  }
};

exports.update = (req, res) => {
  let { id, name, pass, active } = req.body;
  //agregar el updated at , fecha en que se lo modifica
  try {
    if (isExistUser(id)) {
      user = {
        id: id,
        name: name,
        pass: pass,
        active: active
      };
      daoUser.updateUser(user);
      res.json("Se edito correctamente el usuario");
    } else {
      res.status(400).json("Usuario no encontrado");
    }
  } catch (e) {
    console.log(e);
  }
};

exports.delete = (req, res) => {
  let id = req.params.id;

  try {
    if (!isExistUser(id)) {
      daoUser.deleteUser(id);
      res.json("Se borro el usuario correctamente");
    } else {
      res.status(400).json("el usuario no existe o ya fue borrado");
    }
  } catch (e) {
    console.log(e);
  }
};
