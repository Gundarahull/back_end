const path = require('path');

const express = require('express');

const bodyParser = require('body-parser');

const sequelize=require('./util/database')

const app = express();

const admin=require('./routes/routes')

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname,'public')))

app.use('/',admin)

sequelize.sync().then(result=>{    //sync method for creating the tables in database
    // console.log(result);
    app.listen(4000)
})
