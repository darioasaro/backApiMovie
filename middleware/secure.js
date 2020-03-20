const redisService = require("../services/redis");

exports.admin = (req, res, next) => {
  
  var token = req.headers.authorization;
 
  redisService.get(token, (err, result) => {
    if (err) {
      return res.status(500).send("Internal Server Error.");
    }
    try{
    var resp = JSON.parse(result);
    if (resp.id_role !== 1) {
      return res.status(403).send("Unautorizhed");
    }

    return next();
  }
  catch(e){
    return res.status(500).send('Internal Server Error.');
  }
  });
};



