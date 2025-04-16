const express = require('express');
const walletController = require('../controller/walletController');
const passport = require('../middleware/authenticate');
const walletValidator = require('../validator/walletValidator');


const router = express.Router();
const authenticateUser = passport.authenticate("jwt", { session: false });


router.post('/get-balance', authenticateUser, walletController.getBalance);
router.post('/add-balance', authenticateUser, walletValidator.validateAddBalance, walletController.addBalance);


module.exports = router;