const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('app','root','rabiya',{
    dialect:'mysql',
    host:'localhost'
})

module.exports=sequelize