const Product = require('../models/product');
const mongoose = require('mongoose');


exports.product_get_all = (req, res, next) => {
  Product.find()
    .select('name price _id productImage')
    .then(result => {
      const response = result;
      //{
      //count: result.length,
      //products: result

      // result.map((doc) => {
      //   return {
      //     product: doc,
      //     request: {
      //       type: "GET",
      //       url: "http://localhost:3000/products/" + doc._id,
      //     }
      //   };
      // })

      //}
      console.log(JSON.stringify(response));
      //if(result.length>=0){
      res.status(200).json(response);
      //}else{
      // res.status(404).json({
      //     message:'No entries found'
      // });  
      //}
    }).catch(error => {
      console.error(error)
      res.status(500).json({
        error: error
      });
    })
}

exports.product_create = (req, res, next) => {

  console.log(req.file);
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

exports.product_get_by_Id = (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id).select('name price _id productImage')
    .then(result => {
      if (result == null) {
        res.status(404).json({
          message: 'NO valid entry found'
        });
      }
      res.status(200).json({
        name: result.name,
        price: result.price,
        _id: result._id,
        productImage: result.productImage,
        request: {
          type: "GET",
          url: "http://localhost:3000/products/" + result._id
        }
      });
    })
    .catch(error => {
      console.error(error.message);
      res.status(500).json({
        error: error
      });
    });
}

exports.product_update = (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.update({
    _id: id
  }, {
    $set: updateOps
  }).then(result => {
    res.status(200).json({
      message: "Product updated",
      request: {
        type: "GET",
        url: "http://localhost:3000/products/" + result._id
      }
    });

  }).catch(error => {
    console.error(error.message);
    res.status(500).json({
      error: error
    });
  });
}

exports.product_delet = (req, res, next) => {
  const id = req.params.productId;
  Product.remove({
    _id: id
  }).then(result => {
    res.status(200).json({
      message: "Product deleted",
      request: {
        type: "POST",
        body: {
          name: "String",
          price: "Number"
        }
      }
    });
  }).catch(error => {
    console.error(error.message);
    res.status(500).json({
      error: error
    });
  });
}
