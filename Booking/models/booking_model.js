
const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const booking = sequelize.define('appointment', {

  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  Username: Sequelize.STRING,
  PhoneNumber: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  Email: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = booking
