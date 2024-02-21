const express=require('express')
const app=express()
const bodyparser=require('body-parser')
app.use(bodyparser.urlencoded({ extended:false}))

app.set('view engine','ejs')
app.set('views')

const signuproutes=require('./routes/signup-routes')
app.use(signuproutes)

app.listen(1498,()=>{
    console.log("Server Started");
})