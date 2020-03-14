const db = require('../config/connection')

exports.addUser = (user,cb)=>{
    db.connection.query(`INSERT INTO users (username, password,id_role) VALUES(?,?,?)`
    ,[user.name,user.pass,user.role],(err,rows)=>{
        if(err)throw err

        cb(err,rows)
    }
    
    
    )

}