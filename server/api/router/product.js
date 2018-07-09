const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');
const productController = require('../controller/product');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  //reject file
  if (file.mimetype == 'image/png' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(new Error("Invalid file."), false);
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 5,
  }
})


router.get('/', auth, productController.product_get_all);


router.post('/', upload.single('productImage'), auth, (req, res, next) => {

    const product = new Product({
      _id: mongoose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price,
      email: req.userData.email,
      productImage: req.file.path
    });
    product.save().then(result => {
        res.status(200).json({
          message: 'Product created',
          // createdProduct: {
          //   _id: product._id,
          //   name: product.name,
          //   price: product.price,
          //   request: {
          //     type: "GET",
          //     url: "http://localhost:3000/products/" + result._id
          //   }
          // }
        });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({
          error: err
        });
      });

  }

)

module.exports = router;
