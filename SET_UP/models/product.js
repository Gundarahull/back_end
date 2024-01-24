const db=require('../util/database')
const fs = require('fs');
const path = require('path');

const Cart = require('./cart');


module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute('INSERT INTO products(title,price,description,imageURL) VALUES (?,?,?,?)',
    [this.title,this.price,this.description,this.imageUrl]
    )
    
  }

  static deleteById(id) {
    return db.execute('DELETE FROM products where products.id=?',[id])
    
  }

  static fetchAll() {
   return db.execute('SELECT *FROM products')

  }

  static findById(id) {
     return db.execute('SELECT *FROM products where products.id=?',[id])
  };
}
