const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
// const db=require('./util/database')

const sequelize = require('./util/database')
// const sequelize=require('../util/database')

const Product = require('./models/product')

const User = require('./models/user')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{ //just register as incoming request
    User.findByPk(1).then(user=>{
        req.user=user  //by these only we are grtting the userid 1 in table in admin hs(conteollers)
        next()   //dummy user
    })
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' }) //user creted a product nor purchases

User.hasMany(Product)

sequelize.sync().then(result => {
    // console.log(result);
    return User.findByPk(1)

}).then(user => {
    if (!user) {
        return User.create({ name: 'RAHUL', email: 'rahul@gmail.com' })
    }
    return user
}).then(user => {
    console.log(user);
    app.listen(3000);
}).catch(err => {
    // console.log(err);
})
//look the all the models //creating tables by SYNC


