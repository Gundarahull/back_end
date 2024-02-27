const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Chat=sequelize.define('signup',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false
    },
    message:{
        type:DataTypes.STRING,
        allowNull:false  
    }
},{tableName:'chats'})

module.exports=Chat