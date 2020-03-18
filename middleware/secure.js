const redisService = require('../services/redis')


exports.secure=(req, res, next)=> {
    console.log('pasa por el middelware')

    // var token = req.headers.authorization
    

    // redisService.get('token',(err,results)=>{
    //     console.log('result',results)
        
    // })

    next();
    
    // redisService.get('token', (err, result) => {
    //     if (err) {
    //         return res.status(500).send('Internal Server Error.');
    //     }

    //     if (!result) {
    //         /* Otra alternativa es que le envie un error particular */
    //         req.session = null;
    //         return next();
    //     }

    //     try {
    //         req.session = JSON.parse(result);
    //     } catch (e) {
    //         return res.status(500).send('Internal Server Error.');
    //     }

    //     req.session.token = token;

    //     return next();
    // });
    
    
    
    
    
    
    
    // if (!token) {
    //   res.status(401).send({
    //     ok: false,
    //     message: 'Toket inválido'
    //   })
    // }
  
    // token = token.replace('Bearer ', '')
  
    // jwt.verify(token, secret, function(err, token) {
    //   if (err) {
    //     return res.status(401).send({
    //       ok: false,
    //       message: 'Token inválido'
    //     });
    //   } else {
    //     req.token = token
    //     next()
    //   }
    // });
  };