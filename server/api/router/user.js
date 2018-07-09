const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const userController = require('../controller/user');

router.post('/register', userController.user_signup);

router.post("/login", userController.user_login);



module.exports = router;
