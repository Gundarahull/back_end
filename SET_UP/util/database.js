const mysql =require('mysql2')

const pool=mysql.createPool({
    host:'localhost',
    user:'root',
    database:'nodecomplete',
    password:'rabiya'
})
//for multiple queries


module.exports=pool.promise()