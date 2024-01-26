// const db=require('../util/database')
// const fs = require('fs');
// const path = require('path');

// const Cart = require('./cart');


// module.exports = class Product {
//   constructor(id, title, imageUrl, description, price) {
//     this.id = id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }

//   save() {
//     return db.execute('INSERT INTO products(title,price,description,imageURL) VALUES (?,?,?,?)',
//     [this.title,this.price,this.description,this.imageUrl]
//     )

//   }

//   static deleteById(id) {
//     return db.execute('DELETE FROM products where products.id=?',[id])

//   }

//   static fetchAll() {
//    return db.execute('SELECT *FROM products')

//   }

//   static findById(id) {
//      return db.execute('SELECT *FROM products where products.id=?',[id])
//   };
// } 


//We are creating a  table in database through the outer surce by the sequelize

const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  imageURL: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Product
