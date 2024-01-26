const Product = require('../models/product');
const Cart = require('../models/cart');

//in the products session reteriving the data
exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      })
    })
}

//get the product when hit by the details
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findAll({ where: { id: prodId } })
    .then((product) => {        //prosuct gives an array 
      console.log(product, "findbyid");
      res.render('shop/product-detail', {
        product: product[0],
        pageTitle: product[0].title,
        path: '/products'
      });
    });
};

//retriving the data from the database to the shop
exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      console.log(products, "GETINDEX");
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      })
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(cart => {
      return cart.getProducts()
        .then(products => {
          res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: products
          });
        })
    }).catch(err => {
      console.log(err);
    })
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let newQuantity = 1
  let fetchedcart
  req.user.getCart()
    .then(cart => {
      fetchedcart = cart
      return cart.getProducts({ where: { id: prodId } })
    }).then(products => {
      let product
      if (products.length > 0) {
        product = products[0]
      }
      
      if (product) {
        const oldquantity = product.cartItem?.quantity
        newQuantity = oldquantity + 1
        return product
      }
      return Product.findByPk(prodId)
    }).then((product) => {
      return fetchedcart.addProduct(product, {
        through: { quantity: newQuantity }
      })
    })
    .then(() => {
      res.redirect('/cart')
    })
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
  .then((product) => {
    return product.destroy()
  }).then(resut => {
    console.log("deelted");
    res.redirect('/cart');
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
