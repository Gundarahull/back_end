

const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Signup=sequelize.define('signup',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false
    },
    phonenumber:{
        type:DataTypes.BIGINT,
        allowNull:false  
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        validate:{isEmail: true}
    },

},{tableName:'signups'})

module.exports={Signup}; 