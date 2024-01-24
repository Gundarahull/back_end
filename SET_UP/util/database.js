// const mysql =require('mysql2')

// const pool=mysql.createPool({
//     host:'localhost',
//     user:'root',
//     database:'nodecomplete',
//     password:'rabiya'
// })
// //for multiple queries


// module.exports=pool.promise()


const Sequelize = require('sequelize')

const sequelize = new Sequelize('nodecomplete', 'root', 'rabiya', {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize
