const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

//adding the data into the database
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user
    .createProduct({  //req use from the app.js there are assigned to 1
      title: title, //without assigning the userid but its showing 1
      price: price,
      imageURL: imageUrl,
      description: description,
    }).then((result => {
      console.log("succesfully ADDED THE PRODUCT in postaddproduct");
      res.redirect('/admin/products');
    })).catch((err) => {
      console.log(err);
    })

};



//editing the product
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  req.user
    .getProducts({ where: { id: prodId } })
    .then(products => {
      const product = products[0]
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      });
    })
    .catch(err => console.log(err));
};

//updating the product
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  Product.findByPk(prodId)
    .then(product => {
      product.title = updatedTitle,
        product.price = updatedPrice,
        product.imageURL = updatedImageUrl,
        product.description = updatedDesc
      return product.save()
    }).then(result => {
      console.log("updated CART");
    })
  res.redirect('/admin/products');
};

//get admin-procuts
exports.getProducts = (req, res, next) => {
  req.user
    .getProducts()
    .then(product => {
      console.log(product, "IN ADMIN PRODUCT");
      res.render('admin/products', {
        prods: product,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => {
      console.log(err);
    })
};

//deleting the product
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then((product) => {
      return product.destroy()
    }).then(resut => {
      console.log("deelted");
      res.redirect('/admin/products');
    })
};

