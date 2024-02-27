const express=require('express')
const app=express()

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const bodyparser=require('body-parser')
app.use(bodyparser.urlencoded({ extended:false}))

app.set('view engine','ejs')
app.set('views')

const signuproutes=require('./routes/signup-routes')
const sequelize = require('./util/database')

const { Signup } = require('./models/signup-model')
const Chat = require('./models/Chat-model')

app.use(signuproutes)

Signup.hasMany(Chat)
Chat.belongsTo(Signup)


sequelize.authenticate().then(()=>{
    console.log("CONNECTION DONE");
}).catch((err)=>{
    console.log(err);
})
     
sequelize.sync()
.then((result)=>{
    console.log("CREATED TABLE");
}).catch(err=>{
    console.log(err);
})

app.listen(1498,()=>{
    console.log("Server Started");
})