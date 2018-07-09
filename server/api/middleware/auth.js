const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (req, res, next) => {
  try {
    console.log('HEADERS :: ', req.headers);
    console.log(req.headers['token']);
    const decoded = jwt.verify(req.headers['token'].split(' ')[1], config.secret);
    console.log('Decoded ', decoded);
    req.userData = decoded;
    next();

  } catch (err) {
    res.status(401).json({
      message: 'Auth failed'
    });
  }
}
