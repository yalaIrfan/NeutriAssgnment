const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');


exports.user_signup = (req, res, next) => {
  console.log('user reg');
  User.find({
    email: req.body.email
  }).then(u => {
    if (u.length > 0) {
      res.status(409).json({
        message: 'User exists'
      });
    } else {
      console.log(222);
      bcrypt.hash(req.body.password, 10, function (err, hash) {
        if (err) {
          return res.status(500).json({
            error: err
          });
        } else {
          const user = new User({
            _id: mongoose.Types.ObjectId(),
            email: req.body.email,
            name: req.body.name,
            password: hash
          });

          user
            .save()
            .then(result => {
              console.log(result);
              res.status(201).json({
                message: 'User created'
              });
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({
                err
              });
            });

        }

      })


    }
  })
}
exports.user_login = function (req, res, next) {
  User.find({
      email: req.body.email
    }).then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: 'Auth failed, user does\'t found'
        })
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          console.log('password confirm');
          return res.status(401).json({
            message: 'Auth failed'
          })
        }
        console.log(result)
        if (result) {

          const token = jwt.sign({
              email: user[0].email,
              //userId: user[0]._id
            },
            config.secret, {
              expiresIn: "1h"
            }
          );
          return res.status(200).json({
            message: 'Auth Successfull',
            token: token,
            user: user[0].name
          })
        }

        res.status(401).json({
          message: 'Auth failed, wrong passwword...',
        })

      })


    })
    .catch(err => {

    });
}
