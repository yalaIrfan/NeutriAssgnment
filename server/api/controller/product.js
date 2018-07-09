const Product = require('../models/product');
const mongoose = require('mongoose');


exports.product_get_all = (req, res, next) => {

  console.log(req.userData.email, 55555)
  Product.find({
      email: req.userData.email
    })
    .select('name price _id productImage')
    .then(result => {
      const response = result;

      res.status(200).json(response);

    }).catch(error => {
      console.error(error)
      res.status(500).json({
        error: error
      });
    })
}

exports.product_create = (req, res, next) => {

  const product = new Product({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path
  });
  product.save().then(result => {
      res.status(200).json({
        message: 'Product created',
        createdProduct: {
          _id: product._id,
          name: product.name,
          price: product.price,
          request: {
            type: "GET",
            url: "http://localhost:3000/products/" + result._id
          }
        }
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: err
      });
    });

}
