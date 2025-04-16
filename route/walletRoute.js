const express = require('express');
const walletController = require('../controller/walletController');
const passport = require('../middleware/authenticate');


const router = express.Router();
const authenticateUser = passport.authenticate("jwt", { session: false });


router.post('/get-balance', authenticateUser, walletController.getBalance);


module.exports = router;