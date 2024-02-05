const express=require('express')
const app=express()
const bodyparser=require('body-parser')
const path=require('path')
const flash = require('connect-flash');
const session = require('express-session');



const sequelize = require('./util/database')
app.use(bodyparser.urlencoded({ extended:false}))

app.set('view engine','ejs')
app.set('views')
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));
app.use(flash());

const signuproutes=require('./routes/signup-routes')
app.use(signuproutes)

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

app.listen(1864,()=>{
    console.log("Server Started");
})