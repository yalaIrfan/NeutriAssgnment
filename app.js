const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRoute = require('./server/api/router/product');
const config = require('./server/api/config/config');
const userRoute = require('./server/api/router/user')
const app = express();
const path = require('path');

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
mongoose.connect(config.database, {
    useNewUrlParser: true
  })
  .then(() => console.log('Connected to db')).catch(err => console.error(err.message));
mongoose.Promise = global.Promise;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
    'Origin ,X-Requested-With,Content-Type,Accept,Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELET,PATCH');
    return res.status(200).json({});
  }
  next();

});
app.use(express.static(path.join(__dirname, 'dist')));
app.use(morgan('dev'));

app.use('/uploads', express.static('uploads'));
app.use('/api/products', productRoute);
app.use('/users', userRoute);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
});


app.use((req, res, next) => {
  const error = new Error('Not found.!');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
