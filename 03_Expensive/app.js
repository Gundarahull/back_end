const express=require('express')
const app=express()
const bodyparser=require('body-parser')
const path=require('path')
const flash = require('connect-flash');
const session = require('express-session');
//for encrypt the passwords so Cool
const bcrypt = require('bcrypt');



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
//sinup routes
const signuproutes=require('./routes/signup-routes')
app.use(signuproutes)
//expensive routes
const expenseroutes=require('./routes/expense-routes')
app.use(expenseroutes)

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