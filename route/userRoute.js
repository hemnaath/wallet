const express = require('express');
const userController = require('../controller/userController');
const userValidator = require('../validator/userValidator');

const router = express.Router();

router.post('/register', userValidator.validateRegister, userController.register);


module.exports = router;