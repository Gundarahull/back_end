const Sequelize = require('sequelize')

const sequelize = new Sequelize('booking', 'root', 'rabiya',{
    dialect:'mysql',
    host:'localhost'
})

module.exports = sequelize