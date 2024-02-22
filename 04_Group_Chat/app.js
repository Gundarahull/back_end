const express=require('express')
const app=express()
const bodyparser=require('body-parser')
app.use(bodyparser.urlencoded({ extended:false}))

app.set('view engine','ejs')
app.set('views')

const signuproutes=require('./routes/signup-routes')
const sequelize = require('./util/database')
const { Signup } = require('./models/signup-model')
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

app.listen(1498,()=>{
    console.log("Server Started");
})